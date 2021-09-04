from json import dumps
import smartpy as sp

FA2 = sp.io.import_script_from_url("https://smartpy.io/dev/templates/FA2.py")


class FundingCerti(FA2.FA2):
    def __init__(self, config, metadata, admin):
        if config.assume_consecutive_token_ids:
            self.all_tokens.doc = """
            This view is specified (but optional) in the standard.

            This contract is built with assume_consecutive_token_ids =
            True, so we return a list constructed from the number of tokens.
            """
        else:
            self.all_tokens.doc = """
            This view is specified (but optional) in the standard.

            This contract is built with assume_consecutive_token_ids =
            False, so we convert the set of tokens from the storage to a list
            to fit the expected type of TZIP-16.
            """
        list_of_views = [
            self.get_balance
            , self.does_token_exist
            , self.count_tokens
            , self.all_tokens
            , self.is_operator
        ]

        if config.store_total_supply:
            list_of_views = list_of_views + [self.total_supply]
        if config.use_token_metadata_offchain_view:
            self.set_token_metadata_view()
            list_of_views = list_of_views + [self.token_metadata]

        metadata_base = {
            "version": config.name
            , "description" : (
                "This is a didactic reference implementation of FA2,"
                + " a.k.a. TZIP-012, using SmartPy.\n\n"
                + "This particular contract uses the configuration named: "
                + config.name + "."
            )
            , "interfaces": ["TZIP-012", "TZIP-016"]
            , "authors": [
                "Seb Mondet <https://seb.mondet.org>"
            ]
            , "homepage": "https://gitlab.com/smondet/fa2-smartpy"
            , "views": list_of_views
            , "source": {
                "tools": ["SmartPy"]
                , "location": "https://gitlab.com/smondet/fa2-smartpy.git"
            }
            , "permissions": {
                "operator":
                "owner-or-operator-transfer" if config.support_operator else "owner-transfer"
                , "receiver": "owner-no-hook"
                , "sender": "owner-no-hook"
            }
            , "fa2-smartpy": {
                "configuration" :
                dict([(k, getattr(config, k)) for k in dir(config) if "__" not in k and k != 'my_map'])
            }
        }
        self.init_metadata("metadata_base", metadata_base)
        FA2.FA2_core.__init__(self, config, metadata, paused = False, administrator = admin)
    
    def make_metadata(block, donor, donation):
        "Helper function to build metadata JSON bytes values."
        return (sp.map(l = {
            "block_slug" : sp.utils.bytes_of_string(str(block.slug)),
            "block_title" : sp.utils.bytes_of_string(str(block.title)),
            "issuer_address": sp.utils.bytes_of_string(str(sp.source)),
            "donor_name": sp.utils.bytes_of_string(str(donor.name)),
            "donor_address": sp.utils.bytes_of_string(str(donor.address)),
            "effective_donation": sp.utils.bytes_of_string(str(donation)),
            "issuance_date": sp.utils.bytes_of_string(str(sp.now)),
        }))
    
    @sp.entry_point
    def mint(self, params):
        token_id = self.token_id_set.cardinal(self.data.all_tokens)
        sp.verify(self.is_administrator(sp.sender), message = self.error_message.not_admin())
        if self.config.single_asset:
            sp.verify(token_id == 0, message = "single-asset: token-id <> 0")
        if self.config.non_fungible:
            sp.verify(params.amount == 1, message = "NFT-asset: amount <> 1")
            sp.verify(
                ~ self.token_id_set.contains(self.data.all_tokens, token_id),
                message = "NFT-asset: cannot mint twice same token"
            )
        user = self.ledger_key.make(params.address, token_id)
        self.token_id_set.add(self.data.all_tokens, token_id)
        sp.if self.data.ledger.contains(user):
            self.data.ledger[user].balance += params.amount
        sp.else:
            self.data.ledger[user] = FA2.Ledger_value.make(params.amount)
        sp.if self.data.token_metadata.contains(token_id):
            if self.config.store_total_supply:
                self.data.total_supply[token_id] = params.amount
        sp.else:
            self.data.token_metadata[token_id] = sp.record(
                token_id    = token_id,
                token_info  = params.metadata
            )
            if self.config.store_total_supply:
                self.data.total_supply[token_id] = params.amount


@sp.add_test(name = "Funding Certificate Test")
def test():
    scenario = sp.test_scenario()
    admin = sp.test_account("Admin")
    user1 = sp.test_account("User 1")
    user2 = sp.test_account("User 2")
    user3 = sp.test_account("User 3")

    funding_certi = FundingCerti(
        FA2.FA2_config(
            single_asset=False,
            non_fungible=True,      
            assume_consecutive_token_ids = True,
        ),
        metadata = sp.big_map({
            "": sp.utils.bytes_of_string("tezos-storage:content"),
            "content": sp.utils.bytes_of_string(
                dumps({
                    "name": "Funding-Blocks Certificate"
                })
            ),}
        ),
        admin = admin.address,
    )
    scenario += funding_certi

    scenario.h1("Admin mint a certificate to User2")
    scenario += funding_certi.mint(
        address = user2.address,
        amount = 1,
        metadata = FundingCerti.make_metadata(
            block = sp.record(
                slug = "xyz",
                title = "XYZ",
            ),
            donor = sp.record(
                name = "User 2",
                address = user2.address,
            ),
            donation = sp.tez(2000),
        )
    ).run(sender = admin)

    scenario.h1("Admin mint a certificate to User3")
    scenario += funding_certi.mint(
        address = user3.address,
        amount = 1,
        metadata = FundingCerti.make_metadata(
            block = sp.record(
                slug = "xyz",
                title = "XYZ",
            ),
            donor = sp.record(
                name = "User 3",
                address = user3.address,
            ),
            donation = sp.tez(3000),
        )
    ).run(sender = admin)

    def arguments_for_balance_of(receiver, reqs):
        return (sp.record(
            callback = sp.contract(
                    FA2.Balance_of.response_type(),
                    receiver,
                    entry_point = "receive_balances").open_some(),
                requests = reqs))

    scenario.h1("Balance of all the users")
    consumer = FA2.View_consumer(funding_certi)
    scenario += consumer
    scenario += funding_certi.balance_of(
        arguments_for_balance_of(
            consumer.address,
            [
                sp.record(
                    owner = user2.address,
                    token_id = 1
                ),
                sp.record(
                    owner = user3.address,
                    token_id = 2
                )
            ]
        )
    )
