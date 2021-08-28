import smartpy as sp


class FundingBlock(sp.Contract):
    def __init__(self):
        """
        Initialize the contract.
        """
        self.init_type(
            sp.TRecord(
                profiles=sp.TBigMap(
                    sp.TAddress,  # Unique address of the user
                    sp.TRecord(
                        name=sp.TString,  # Name of the user
                        bio=sp.TString,  # Bio of the user
                        donated=sp.TMutez,  # Total amount of donated tokens
                        upvoted=sp.TSet(sp.TString),  # Set of upvoted funding blocks
                        downvoted=sp.TSet(sp.TString),  # Set of downvoted funding blocks
                        voted=sp.TMap(sp.TString, sp.TMutez),  # Map of event names to their voted amounts
                    ),
                ),
                blocks=sp.TBigMap(
                    sp.TString,  # Funding block slug
                    sp.TRecord(
                        active=sp.TBool,  # Whether the funding block is active
                        title=sp.TString,  # Title of the event
                        description=sp.TString,  # Description of the event
                        location=sp.TString,  # Location of the event
                        image=sp.TString,  # Image of the event
                        target_amount=sp.TMutez,  # Target amount of tokens to be raised
                        deadline=sp.TTimestamp,  # Expected time to get the target amount
                        actions=sp.TString,  # Actions to be taken
                        legal_statements=sp.TString,  # Legal statements
                        thankyou=sp.TString,  # Thank you message
                        author=sp.TAddress,  # Unique address of the user who created the event
                        upvotes=sp.TNat,  # Number of upvotes
                        downvotes=sp.TNat,  # Number of downvotes
                        voters=sp.TMap(sp.TAddress, sp.TMutez),  # Map of addresses to their voted amounts
                        voters_weight=sp.TMutez,  # Total apparent weight of votes
                        final_amount=sp.TMutez,  # Amount decided by the voters
                    ),
                ),
                active_blocks=sp.TInt,  # Number of active blocks
            )
        )
        self.init(profiles=sp.big_map(), blocks=sp.big_map(), active_blocks=0)

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
    def withdraw_back(self, params):
        """
        Withdraw your own tokens from the main Funding block
        """
        sp.verify(self.data.profiles.contains(sp.sender), "User not registered")
        sp.verify(self.data.profiles[sp.sender].donated >= params.amount, "Not enough tokens")
        sp.verify(self.data.active_blocks == sp.int(0), "Cannont withdraw while blocks are active")

        self.data.profiles[sp.sender].donated -= sp.amount
        sp.send(sp.sender, params.amount)

    @sp.entry_point
    def funding_blockify(self, params):
        """
        Create a new funding block
        """
        sp.verify(self.data.profiles.contains(sp.sender), "User not registered")

        block = sp.record(
            active=sp.bool(True),
            title=params.title,
            description=params.description,
            location=params.location,
            image=params.image,
            target_amount=params.target_amount,
            deadline=params.deadline,
            actions=params.actions,
            legal_statements=params.legal_statements,
            thankyou=params.thankyou,
            author=sp.sender,
            upvotes=sp.nat(0),
            downvotes=sp.nat(0),
            voters=sp.map(),
            voters_weight=sp.mutez(0),
            final_amount=sp.mutez(0),
        )
        self.data.blocks[params.slug] = block
        self.data.active_blocks += sp.int(1)

    @sp.entry_point
    def upvote(self, params):
        """
        Upvote a funding block
        """
        sp.verify(self.data.profiles.contains(sp.sender), "User not registered")
        sp.verify(self.data.profiles[sp.sender].donated > sp.mutez(0), "User never donated")

        self.data.blocks[params.block_slug].upvotes += sp.nat(1)
        self.data.profiles[sp.sender].upvoted.add(params.block_slug)

    @sp.entry_point
    def downvote(self, params):
        """
        Downvote a funding block
        """
        sp.verify(self.data.profiles.contains(sp.sender), "User not registered")
        sp.verify(self.data.profiles[sp.sender].donated > sp.mutez(0), "User never donated")

        self.data.blocks[params.block_slug].downvotes += sp.nat(1)
        self.data.profiles[sp.sender].downvoted.add(params.block_slug)

    @sp.entry_point
    def vote(self, params):
        """
        Vote on a funding block
        """
        sp.verify(self.data.profiles.contains(sp.sender), "User not registered")
        sp.verify(self.data.profiles[sp.sender].donated > sp.mutez(0), "User never donated")
        sp.verify(self.data.blocks[params.block_slug].active, "Block is not active")
        sp.verify(params.amount <= sp.balance, "Not enough tokens")
        sp.verify(params.amount > sp.mutez(0), "Amount must be positive")
        sp.verify(~self.data.profiles[sp.sender].voted.contains(params.block_slug), "Already voted")

        donated = self.data.profiles[sp.sender].donated
        average = self.data.blocks[params.block_slug].final_amount
        voters_weight = self.data.blocks[params.block_slug].voters_weight
        number_of_voters = sp.len(self.data.blocks[params.block_slug].voters)
        total_votes_power = sp.mul(average, number_of_voters)
        all_donors_weight = voters_weight+donated
        this_votes_power = sp.mul(donated, sp.fst(sp.ediv(params.amount, sp.mutez(1)).open_some()))
        average = sp.ediv(all_donors_weight + this_votes_power, (voters_weight+donated))
        self.data.blocks[params.block_slug].final_amount = sp.snd(average.open_some())

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

        sp.send(sp.sender, self.data.blocks[params.block_slug].final_amount)
        self.data.blocks[params.block_slug].active = sp.bool(False)
        self.data.active_blocks -= sp.int(1)

# Test
@sp.add_test(name = "Funding Block test")
def test():
    contract = FundingBlock()
    scenario = sp.test_scenario()
    scenario += contract

    user = sp.test_account("John Doe")
    scenario.h2("Register new user")
    scenario += contract.register(
        name="John Doe", bio="John Doe is a superman"
    ).run(sender=user)