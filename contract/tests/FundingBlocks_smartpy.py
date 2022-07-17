import smartpy as sp

FA2 = sp.io.import_script_from_url("https://smartpy.io/dev/templates/FA2.py")
certi_contract = sp.io.import_script_from_url("file:contracts/FundingCertis.py")
funding_blocks_contract = sp.io.import_script_from_url("file:contracts/FundingBlocks.py")


@sp.add_test(name = "Funding Blocks test")
def test():
    scenario = sp.test_scenario()
    admin = sp.test_account("Admin")

    funding_certis = certi_contract.FundingCertis(
        FA2.FA2_config(
            add_mutez_transfer = True,
            debug_mode = True,
            non_fungible = True,
            store_total_supply = False,
            support_operator = False,
            use_token_metadata_offchain_view = True
        ),
        metadata = sp.utils.metadata_of_url("ipfs://QmQscMBDeb6PdbSmv2sm68xrZABin9rY7bdgzTBKaiC3WW"),
        admin = admin.address,
    )
    scenario += funding_certis

    contract = funding_blocks_contract.FundingBlocks(admin.address, funding_certis.address)
    scenario += contract

    scenario.h1("Setting Funding Blocks contract as an admin of Certificates contract")
    scenario += funding_certis.set_administrator(contract.address).run(sender=admin)

    scenario.h1("5 Users getting ready")
    user1 = sp.test_account("User1")
    user2 = sp.test_account("User2")
    user3 = sp.test_account("User3")
    user4 = sp.test_account("User4")
    user5 = sp.test_account("User5")

    scenario.h1("Testing admin features of Funding Blocks contract")
    scenario += contract.set_administrator(user1.address).run(sender=user1, valid=False)
    scenario += contract.set_administrator(admin.address).run(sender=admin)
    scenario += contract.set_certificate_address(funding_certis.address).run(sender=user1, valid=False)
    scenario += contract.set_certificate_address(funding_certis.address).run(sender=admin)

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
