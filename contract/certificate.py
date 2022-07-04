import smartpy as sp

FA2 = sp.io.import_script_from_url("https://smartpy.io/dev/templates/FA2.py")


class FundingCertis(FA2.FA2):
    pass


sp.add_compilation_target(
    "Funding Blocks Certificates",
    FundingCertis(
        admin   = sp.address("tz1c8SWpNUVrV8cBAKPbYgSsaW8XpwpKvxgx"),
        config  = FA2.FA2_config(
            add_mutez_transfer = True,
            debug_mode = True,
            non_fungible = True,
            store_total_supply = False,
            support_operator = False,
            use_token_metadata_offchain_view = True
        ),
        metadata = sp.utils.metadata_of_url("ipfs://QmQscMBDeb6PdbSmv2sm68xrZABin9rY7bdgzTBKaiC3WW")
    )
)


@sp.add_test(name = "Funding Certificate Test")
def test():
    scenario = sp.test_scenario()
    admin = sp.test_account("Admin")
    user1 = sp.test_account("User 1")
    user2 = sp.test_account("User 2")

    funding_certis = FundingCertis(
        FA2.FA2_config(
            add_mutez_transfer = True,
            debug_mode = True,
            non_fungible = True,
            store_total_supply = False,
            support_operator = False,
            use_token_metadata_offchain_view = True
        ),
        metadata = sp.utils.metadata_of_url("https://example.com"),
        admin = admin.address,
    )
    scenario += funding_certis

    scenario.h1("User1 mint a certificate to User1")
    scenario += funding_certis.mint(
        token_id = funding_certis.data.all_tokens,
        amount = 1,
        address = user1.address,
        metadata = {
            "": sp.utils.bytes_of_string(""),
            "name" : sp.utils.bytes_of_string("FundingBlocks Certificate for User 1"),
            "symbol" : sp.utils.bytes_of_string("FBC-User1"),
            "decimals" : sp.utils.bytes_of_string("0"),

            "block_slug": sp.utils.bytes_of_string("the-1900-great-galveston-storm"),
            "block_title": sp.utils.bytes_of_string("The 1900 Great Galveston Storm"),
            "issuer_address": sp.utils.bytes_of_string("tz1bb299QQuWXuYbynKzPfdVftmZdAQrvrGN"),
            "donor_name": sp.utils.bytes_of_string("User 1"),
            "donor_address": sp.utils.bytes_of_string("tz1c8SWpNUVrV8cBAKPbYgSsaW8XpwpKvxgx"),
            "effective_donation": sp.utils.bytes_of_string("2367845"),
        }
    ).run(sender = user1, valid = False)

    scenario.h1("Admin mint a certificate to User1")
    scenario += funding_certis.mint(
        token_id = funding_certis.data.all_tokens,
        amount = 1,
        address = user1.address,
        metadata = {
            "": sp.utils.bytes_of_string(""),
            "name" : sp.utils.bytes_of_string("FundingBlocks Certificate for User 1"),
            "symbol" : sp.utils.bytes_of_string("FBC-User1"),
            "decimals" : sp.utils.bytes_of_string("0"),

            "block_slug": sp.utils.bytes_of_string("the-1900-great-galveston-storm"),
            "block_title": sp.utils.bytes_of_string("The 1900 Great Galveston Storm"),
            "issuer_address": sp.utils.bytes_of_string("tz1bb299QQuWXuYbynKzPfdVftmZdAQrvrGN"),
            "donor_name": sp.utils.bytes_of_string("User 1"),
            "donor_address": sp.utils.bytes_of_string("tz1c8SWpNUVrV8cBAKPbYgSsaW8XpwpKvxgx"),
            "effective_donation": sp.utils.bytes_of_string("2367845"),
        }
    ).run(sender = admin)

    scenario.h1("Admin mint a certificate to User2")
    scenario += funding_certis.mint(
        token_id = funding_certis.data.all_tokens,
        amount = 1,
        address = user2.address,
        metadata = {
            "": sp.utils.bytes_of_string(""),
            "name" : sp.utils.bytes_of_string("FundingBlocks Certificate for User 2"),
            "symbol" : sp.utils.bytes_of_string("FBC-User2"),
            "decimals" : sp.utils.bytes_of_string("0"),

            "block_slug": sp.utils.bytes_of_string("the-2008-sichuan-earthquake"),
            "block_title": sp.utils.bytes_of_string("The 2008 Sichuan Earthquake"),
            "issuer_address": sp.utils.bytes_of_string("tz1bb299QQuWXuYbynKzPfdVftmZdAQrvrGN"),
            "donor_name": sp.utils.bytes_of_string("User 2"),
            "donor_address": sp.utils.bytes_of_string("tz1ZVD9pCBg33DbCTuoeKcDirnkyc7SjVb1C"),
            "effective_donation": sp.utils.bytes_of_string("928347"),
        }
    ).run(sender = admin)
