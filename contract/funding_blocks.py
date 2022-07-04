import smartpy as sp

FA2 = sp.io.import_script_from_url("https://smartpy.io/dev/templates/FA2.py")
Certificates = sp.io.import_stored_contract("certificate.py")


class FundingBlocks(sp.Contract):
    def __init__(self, certificate_contract_address):
        self.init(
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
            active_blocks=0,
            certificates = certificate_contract_address
        )

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

        number_of_certificates = sp.view('count_tokens', self.data.certificates, sp.unit, sp.TNat).open_some()
        certificate_id = sp.local('certificate_id', number_of_certificates)
        sp.for voter in self.data.blocks[params.block_slug].voters.keys():
            effective_donation = sp.split_tokens(
                self.data.profiles[voter].donated,
                sp.utils.mutez_to_nat(self.data.blocks[params.block_slug].final_amount), 
                sp.utils.mutez_to_nat(sp.balance)
            )

            mint_certificate = sp.contract(
                t = sp.TRecord(
                    token_id = sp.TNat,
                    amount = sp.TNat,
                    address = sp.TAddress,
                    metadata = sp.TMap(sp.TString, sp.TBytes)
                ),
                address = self.data.certificates,
                entry_point = 'mint'
            ).open_some()

            sp.transfer(
                arg = sp.record(
                    token_id = certificate_id.value,
                    amount = 1,
                    address = voter,
                    metadata = sp.map(
                        tkey = sp.TString,
                        tvalue = sp.TBytes,
                        l = {
                            "block_slug": sp.pack(params.block_slug),
                            "block_title": sp.pack(self.data.blocks[params.block_slug].title),
                            "issuer_address": sp.pack(self.data.blocks[params.block_slug].author),
                            "donor_name": sp.pack(self.data.profiles[voter].name),
                            "donor_address": sp.pack(voter),
                            "effective_donation": sp.pack(effective_donation),
                        }
                    )
                ),
                amount = sp.mutez(0),
                destination = mint_certificate
            )

            self.data.profiles[voter].certificate_token_id[params.block_slug] = certificate_id.value
            certificate_id.value += 1

        sp.send(sp.sender, self.data.blocks[params.block_slug].final_amount)
        self.data.blocks[params.block_slug].active = sp.bool(False)
        self.data.active_blocks -= sp.int(1)


# Test
@sp.add_test(name = "Funding Block test")
def test():
    scenario = sp.test_scenario()
    admin = sp.test_account("Admin")

    funding_certis = Certificates.FundingCertis(
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

    contract = FundingBlocks(funding_certis.address)
    scenario += contract

    scenario.h1("Setting Funding Blocks contract as an admin of Certificates contract")
    scenario += funding_certis.set_administrator(contract.address).run(sender=admin)

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
