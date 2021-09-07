from json import dumps
import smartpy as sp

FA2 = sp.io.import_script_from_url("https://smartpy.io/dev/templates/FA2.py")


class Block:
    @sp.entry_point
    def register(self, params):
        """
        Add details for a corresponding address
        """
        sp.verify(~self.data.profiles.contains(sp.sender), "User already registered")

        profile = sp.record(
            name=params.name,
            bio=params.bio,
            donated=sp.mutez(0),
            upvoted=sp.set(),
            downvoted=sp.set(),
            voted=sp.map(),
            certificate_token_id=sp.map(),
        )
        self.data.profiles[sp.sender] = profile

    @sp.entry_point
    def update_profile(self, params):
        """
        Update the details of a corresponding address
        """
        sp.verify(self.data.profiles.contains(sp.sender), "User not registered")

        self.data.profiles[sp.sender].name = params.name
        self.data.profiles[sp.sender].bio = params.bio

    @sp.entry_point
    def donate(self):
        """
        Donate tokens to the main Funding block
        """
        sp.verify(self.data.profiles.contains(sp.sender), "User not registered")

        self.data.profiles[sp.sender].donated += sp.amount

    @sp.entry_point
    def funding_blockify(self, params):
        """
        Create a new funding block
        """
        sp.verify(self.data.profiles.contains(sp.sender), "User not registered")
        sp.verify(~self.data.blocks.contains(params.slug), "Block with this slug already exists")
        self.data.blocks[params.slug] = sp.record(
            active=True,
            title=params.title,
            description=params.description,
            location=sp.record(latitude=params.latitude, longitude=params.longitude),
            image=params.image,
            target_amount=params.target_amount,
            actions=params.actions,
            legal_statements=params.legal_statements,
            thankyou=params.thankyou,
            author=sp.sender,
            upvotes=0,
            upvoted_average=0,
            downvotes=0,
            downvoted_average=0,
            voters=sp.map(),
            voters_weight=sp.mutez(0),
            final_amount=sp.mutez(0),
        )
        self.data.active_blocks += 1

    @sp.entry_point
    def edit_funding_block(self, params):
        """
        Edit a funding block
        """
        sp.verify(self.data.blocks[params.slug].active, "Block not active")
        sp.verify(self.data.blocks[params.slug].author == sp.sender, "User is not the author of this Block")

        self.data.blocks[params.slug] = sp.record(
            active=True,
            title=params.title,
            description=params.description,
            location=sp.record(latitude=params.latitude, longitude=params.longitude),
            image=params.image,
            target_amount=params.target_amount,
            actions=params.actions,
            legal_statements=params.legal_statements,
            thankyou=params.thankyou,
            author=self.data.blocks[params.slug].author,
            upvotes=self.data.blocks[params.slug].upvotes,
            upvoted_average=self.data.blocks[params.slug].upvoted_average,
            downvotes=self.data.blocks[params.slug].downvotes,
            downvoted_average=self.data.blocks[params.slug].downvoted_average,
            voters=self.data.blocks[params.slug].voters,
            voters_weight=self.data.blocks[params.slug].voters_weight,
            final_amount=self.data.blocks[params.slug].final_amount,
        )

    @sp.entry_point
    def delete_block(self, params):
        """
        Delete a block
        """
        sp.verify(self.data.profiles.contains(sp.sender), "User not registered")
        sp.verify(self.data.blocks[params.slug].active, "Block not active")
        sp.verify(self.data.blocks[params.slug].author == sp.sender, "Not the author of this block")

        sp.if self.data.blocks[params.slug].active:
            self.data.active_blocks -= 1
        del self.data.blocks[params.slug]

    @sp.entry_point
    def upvote(self, params):
        """
        Upvote a funding block
        """
        sp.verify(self.data.profiles.contains(sp.sender), "User not registered")
        sp.verify(self.data.blocks[params.block_slug].active, "Block not active")
        sp.verify(self.data.profiles[sp.sender].donated > sp.mutez(0), "User have not donated")
        sp.verify(~self.data.profiles[sp.sender].upvoted.contains(params.block_slug), "User already upvoted")

        users_donation = self.data.profiles[sp.sender].donated
        contract_balance = sp.balance
        upvoted_percentage = sp.fst(sp.ediv(sp.mul(10000, users_donation), contract_balance).open_some())
        self.data.blocks[params.block_slug].upvoted_average += upvoted_percentage
        self.data.blocks[params.block_slug].upvotes += 1
        self.data.profiles[sp.sender].upvoted.add(params.block_slug)

    @sp.entry_point
    def downvote(self, params):
        """
        Downvote a funding block
        """
        sp.verify(self.data.profiles.contains(sp.sender), "User not registered")
        sp.verify(self.data.blocks[params.block_slug].active, "Block not active")
        sp.verify(self.data.profiles[sp.sender].donated > sp.mutez(0), "User have not donated")
        sp.verify(~self.data.profiles[sp.sender].downvoted.contains(params.block_slug), "User already downvoted")

        users_donation = self.data.profiles[sp.sender].donated
        contract_balance = sp.balance
        downvoted_percentage = sp.fst(sp.ediv(sp.mul(10000, users_donation), contract_balance).open_some())
        self.data.blocks[params.block_slug].downvoted_average += downvoted_percentage
        self.data.blocks[params.block_slug].downvotes += 1
        self.data.profiles[sp.sender].downvoted.add(params.block_slug)

        downvoted_average = self.data.blocks[params.block_slug].downvoted_average
        sp.if downvoted_average > 5000:
            del self.data.blocks[params.block_slug]
            self.data.active_blocks -= sp.int(1)

    @sp.entry_point
    def vote(self, params):
        """
        Vote on a funding block
        """
        sp.verify(self.data.profiles.contains(sp.sender), "User not registered")
        sp.verify(self.data.profiles[sp.sender].donated > sp.mutez(0), "User have not donated")
        sp.verify(self.data.blocks[params.block_slug].active, "Block is not active")
        sp.verify(params.amount <= sp.balance, "Not enough tokens")
        sp.verify(params.amount > sp.mutez(0), "Amount must be positive")
        sp.verify(~self.data.profiles[sp.sender].voted.contains(params.block_slug), "Already voted")

        donated = self.data.profiles[sp.sender].donated
        average = self.data.blocks[params.block_slug].final_amount
        voters_weight = self.data.blocks[params.block_slug].voters_weight
        total_votes_power = sp.mul(average, sp.utils.mutez_to_nat(voters_weight))
        all_donors_weight = voters_weight+donated
        this_votes_power = sp.mul(donated, sp.fst(sp.ediv(params.amount, sp.mutez(1)).open_some()))
        average = sp.ediv(total_votes_power + this_votes_power, all_donors_weight)
        self.data.blocks[params.block_slug].final_amount = sp.utils.nat_to_mutez(sp.fst(average.open_some()))

        self.data.blocks[params.block_slug].voters_weight += donated
        self.data.blocks[params.block_slug].voters[sp.sender] = params.amount
        self.data.profiles[sp.sender].voted[params.block_slug] = params.amount

    @sp.entry_point
    def claim_block_amount(self, params):
        """
        Claim the amount of tokens you have in a funding block
        """
        sp.verify(self.data.profiles.contains(sp.sender), "User not registered")
        sp.verify(self.data.blocks[params.block_slug].author == sp.sender, "Not the author")
        sp.verify(self.data.blocks[params.block_slug].active, "Block is not active")
        sp.verify(self.data.blocks[params.block_slug].voters_weight >= sp.split_tokens(sp.balance, sp.nat(1), sp.nat(4)), "Need more voters")

        sp.for voter in self.data.blocks[params.block_slug].voters.keys():
            effective_donation = sp.split_tokens(
                self.data.profiles[voter].donated,
                self.data.blocks[params.block_slug].final_amount, 
                sp.balance
            )
            token_id = self.mint(
                address = voter,
                amount = 1,
                metadata = FundingBlocks.make_metadata(
                    block = sp.record(
                        slug = params.block_slug,
                        title = self.data.blocks[params.block_slug].title,
                    ),
                    donor = sp.record(
                        name = self.data.profiles[voter].name,
                        address = voter,
                    ),
                    donation = effective_donation
                )
            )
            self.data.profiles[voter].certificate_token_id[params.block_slug] = token_id

        sp.send(sp.sender, self.data.blocks[params.block_slug].final_amount)
        self.data.blocks[params.block_slug].active = sp.bool(False)
        self.data.active_blocks -= sp.int(1)


class FundingCertificate(FA2.FA2):
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

    def mint(self, amount, address, metadata):
        """
        Mint Certificate as a Non-Fungible Token.
        """
        token_id = self.token_id_set.cardinal(self.data.all_tokens)
        if self.config.single_asset:
            sp.verify(token_id == 0, message = "single-asset: token-id <> 0")
        if self.config.non_fungible:
            sp.verify(amount == 1, message = "NFT-asset: amount <> 1")
            sp.verify(
                ~ self.token_id_set.contains(self.data.all_tokens, token_id),
                message = "NFT-asset: cannot mint twice same token"
            )
        user = self.ledger_key.make(address, token_id)
        self.token_id_set.add(self.data.all_tokens, token_id)
        sp.if self.data.ledger.contains(user):
            self.data.ledger[user].balance += amount
        sp.else:
            self.data.ledger[user] = FA2.Ledger_value.make(amount)
        sp.if self.data.token_metadata.contains(token_id):
            if self.config.store_total_supply:
                self.data.total_supply[token_id] = amount
        sp.else:
            self.data.token_metadata[token_id] = sp.record(
                token_id    = token_id,
                token_info  = metadata
            )
            if self.config.store_total_supply:
                self.data.total_supply[token_id] = amount
        return token_id


class FundingBlocks(Block, FundingCertificate):
    def __init__(self, config, metadata, admin, *args, **kwargs):
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
        FA2.FA2_core.__init__(self, config, metadata, paused = False, administrator = admin, *args, **kwargs)


# Test
@sp.add_test(name = "Funding Block test")
def test():
    scenario = sp.test_scenario()
    admin = sp.test_account("Admin")
    contract = FundingBlocks(
        FA2.FA2_config(
            single_asset=False,
            non_fungible=True,      
            assume_consecutive_token_ids = True,
        ),
        metadata = sp.big_map({
            "": sp.utils.bytes_of_string("tezos-storage:content"),
            "content": sp.utils.bytes_of_string(
                dumps({
                    "name": "Funding-Blocks"
                })
            ),}
        ),
        admin = admin.address,
        profiles=sp.big_map(
            tkey = sp.TAddress,  # Unique address of the user
            tvalue = sp.TRecord(
                name=sp.TString,  # Name of the user
                bio=sp.TString,  # Bio of the user
                donated=sp.TMutez,  # Total amount of donated tokens
                upvoted=sp.TSet(sp.TString),  # Set of upvoted funding blocks
                downvoted=sp.TSet(sp.TString),  # Set of downvoted funding blocks
                voted=sp.TMap(sp.TString, sp.TMutez),  # Map of block names to their voted amounts
                certificate_token_id=sp.TMap(sp.TString, sp.TNat)  # Map of block names to their certificates NFT-token-ids
            )
        ),
        blocks=sp.big_map(
            tkey = sp.TString,  # Unique slug for Funding Block
            tvalue = sp.TRecord(
                active=sp.TBool,  # Whether the funding block is active
                title=sp.TString,  # Title of the block
                description=sp.TString,  # Description of the block
                location=sp.TRecord(
                    latitude=sp.TString,  # Latitude of the location
                    longitude=sp.TString,  # Longitude of the location
                ),
                image=sp.TString,  # Image of the block
                target_amount=sp.TNat,  # Target amount of tokens to be raised
                actions=sp.TString,  # Actions to be taken
                legal_statements=sp.TString,  # Legal statements
                thankyou=sp.TString,  # Thank you message
                author=sp.TAddress,  # Unique address of the user who created the block
                upvotes=sp.TNat,  # Number of upvotes
                upvoted_average=sp.TNat,  # Represents how much people have upvoted the block
                downvotes=sp.TNat,  # Number of downvotes
                downvoted_average=sp.TNat,  # Represents how much people have upvoted the block
                voters=sp.TMap(sp.TAddress, sp.TMutez),  # Map of addresses to their voted amounts
                voters_weight=sp.TMutez,  # Total apparent weight of votes
                final_amount=sp.TMutez,  # Amount decided by the voters
            )
        ),
        active_blocks=0
    )
    scenario += contract

    scenario.h1("5 Users getting ready")
    user1 = sp.test_account("User1")
    user2 = sp.test_account("User2")
    user3 = sp.test_account("User3")
    user4 = sp.test_account("User4")
    user5 = sp.test_account("User5")

    scenario.h2("1-4 of them registers")
    scenario += contract.register(
        name="User1", bio="This is the first test user"
    ).run(sender=user1)
    scenario += contract.register(
        name="User2", bio="This is the second test user"
    ).run(sender=user2)
    scenario += contract.register(
        name="User3", bio="This is the third test user"
    ).run(sender=user3)
    scenario += contract.register(
        name="User4", bio="This is the zeroth test user"
    ).run(sender=user4)

    scenario.h2("4 and 5 try to edit their profiles")
    scenario += contract.update_profile(
        name="User4", bio="This is the forth test user"
    ).run(sender=user4)
    scenario += contract.update_profile(
        name="User5", bio="This is the fifth test user"
    ).run(sender=user5, valid=False)

    scenario.h1("Donations")
    scenario.h2("1-5 make donations")
    scenario += contract.donate().run(sender=user1, amount=sp.tez(345234))
    scenario += contract.donate().run(sender=user2, amount=sp.tez(653543423))
    scenario += contract.donate().run(sender=user3, amount=sp.tez(234534))
    scenario += contract.donate().run(sender=user4, amount=sp.tez(654234))
    scenario += contract.donate().run(sender=user5, amount=sp.tez(34523), valid=False)

    scenario.h1("Users making funding blocks")
    scenario += contract.funding_blockify(
        slug="blk1",
        title="Funding Block1",
        description="This is the first funding block",
        latitude="28.679079",
        longitude="77.069710",
        image="https://www.brookings.edu/wp-content/uploads/2016/06/wildfire001.jpg",
        target_amount=1000000000000,
        actions="https://www.chubb.com/us-en/individuals-families/resources/what-to-do-when-a-wildfire-approaches.html",
        legal_statements="",
        thankyou="Thank you message 1",
    ).run(sender=user1)
    scenario += contract.funding_blockify(
        slug="blk2",
        title="Funding Block2",
        description="This is the second funding block",
        latitude="28.679079",
        longitude="77.069710",
        image="https://www.brookings.edu/wp-content/uploads/2016/06/wildfire001.jpg",
        target_amount=1000000000000,
        actions="https://www.chubb.com/us-en/individuals-families/resources/what-to-do-when-a-wildfire-approaches.html",
        legal_statements="",
        thankyou="Thank you message 2",
    ).run(sender=user5, valid=False)
    scenario += contract.funding_blockify(
        slug="blk2",
        title="Funding Block2",
        description="This is the second funding block",
        latitude="28.679079",
        longitude="77.069710",
        image="https://www.brookings.edu/wp-content/uploads/2016/06/wildfire001.jpg",
        target_amount=1000000000000,
        actions="https://www.chubb.com/us-en/individuals-families/resources/what-to-do-when-a-wildfire-approaches.html",
        legal_statements="",
        thankyou="Thank you message 2",
    ).run(sender=user3)
    scenario += contract.funding_blockify(
        slug="blk3",
        title="Funding Block3",
        description="This is the third funding block",
        latitude="28.679079",
        longitude="77.069710",
        image="https://www.brookings.edu/wp-content/uploads/2016/06/wildfire001.jpg",
        target_amount=1000000000000,
        actions="https://www.chubb.com/us-en/individuals-families/resources/what-to-do-when-a-wildfire-approaches.html",
        legal_statements="",
        thankyou="Thank you message 3",
    ).run(sender=user2)

    scenario.h1("Updating a Funding Block")
    scenario += contract.edit_funding_block(
        slug="blk2",
        title="Funding Block2",
        description="This is the second funding block",
        latitude="28.679079",
        longitude="77.069710",
        image="https://www.brookings.edu/wp-content/uploads/2016/06/wildfire001.jpg",
        target_amount=1200000000000,
        actions="https://www.chubb.com/us-en/individuals-families/resources/what-to-do-when-a-wildfire-approaches.html",
        legal_statements="",
        thankyou="Thank you message 2",
    ).run(sender=user2, valid=False)
    scenario += contract.edit_funding_block(
        slug="blk2",
        title="Funding Block2",
        description="This is the second funding block",
        latitude="28.679079",
        longitude="77.069710",
        image="https://www.brookings.edu/wp-content/uploads/2016/06/wildfire001.jpg",
        target_amount=1200000000000,
        actions="https://www.chubb.com/us-en/individuals-families/resources/what-to-do-when-a-wildfire-approaches.html",
        legal_statements="",
        thankyou="Thank you message 2",
    ).run(sender=user3)

    scenario.h1("Deleting a Funding Block")
    scenario += contract.delete_block(slug="blk3").run(sender=user3, valid=False)
    scenario += contract.delete_block(slug="blk3").run(sender=user2)

    scenario.h1("Users upvoting/downvoting the funding block")
    scenario += contract.upvote(block_slug="blk1").run(sender=user2)
    scenario += contract.upvote(block_slug="blk1").run(sender=user3)
    scenario += contract.downvote(block_slug="blk1").run(sender=user4)
    scenario += contract.downvote(block_slug="blk2").run(sender=user2)
    scenario.verify(~contract.data.blocks.contains("blk2"))

    scenario.h1("Voting and Claiming")
    scenario.h2("Users voting for the funding block")
    scenario += contract.vote(block_slug="blk1", amount=sp.tez(100000)).run(sender=user3)
    scenario += contract.vote(block_slug="blk1", amount=sp.tez(200000)).run(sender=user4)
    scenario += contract.claim_block_amount(block_slug="blk1").run(sender=user4, valid=False)
    scenario += contract.claim_block_amount(block_slug="blk1").run(sender=user5, valid=False)
    scenario += contract.claim_block_amount(block_slug="blk1").run(sender=user1, valid=False)
    scenario += contract.vote(block_slug="blk1", amount=sp.tez(300000)).run(sender=user2)
    scenario += contract.claim_block_amount(block_slug="blk1").run(sender=user1)
