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
                block=sp.TBigMap(
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
            )
        )
        self.init(profiles=sp.big_map(), block=sp.big_map())

    @sp.entry_point
    def register(self, params):
        """
        Add details for a corresponding address
        """
        sp.verify(~self.data.profiles.contains(params.address), "User already registered")

        self.data.profiles[sp.sender].name = params.name
        self.data.profiles[sp.sender].bio = params.bio
        self.data.profiles[sp.sender].donated = 0
        self.data.profiles[sp.sender].upvoted = sp.set()
        self.data.profiles[sp.sender].downvoted = sp.set()
        self.data.profiles[sp.sender].voted = sp.map()

    @sp.entry_point
    def update_profile(self, params):
        """
        Update the details of a corresponding address
        """
        sp.verify(self.data.profiles.contains(sp.sender), "User not registered")

        self.data.profiles[sp.sender].name = params.name
        self.data.profiles[sp.sender].bio = params.bio

    @sp.entry_point
    def donate(self, params):
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
        sp.for block in self.data.block.values():
            sp.verify(~block.active, "Cannont withdraw while a block is active")

        self.data.profiles[sp.sender].donated -= sp.amount
        sp.send(sp.sender, params.amount, message=str(sp.sender) + " withdrew back " + str(params.amount) + " tez.")

    @sp.entry_point
    def funding_blockify(self, params):
        """
        Create a new funding block
        """
        sp.verify(self.data.profiles.contains(sp.sender), "User not registered")

        block = sp.record(
            active=True,
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
            upvotes=0,
            downvotes=0,
            voters=sp.map(),
            final_amount=0,
        )
        self.data.block[params.slug] = block

    @sp.entry_point
    def upvote(self, params):
        """
        Upvote a funding block
        """
        sp.verify(self.data.profiles.contains(sp.sender), "User not registered")
        sp.verify(self.data.profiles[sp.sender].donated > 0, "User never donated")

        self.data.block[params.block_slug].upvotes += 1
        self.data.profiles[sp.sender].upvoted.add(params.block_slug)

    @sp.entry_point
    def downvote(self, params):
        """
        Downvote a funding block
        """
        sp.verify(self.data.profiles.contains(sp.sender), "User not registered")
        sp.verify(self.data.profiles[sp.sender].donated > 0, "User never donated")

        self.data.block[params.block_slug].downvotes -= 1
        self.data.profiles[sp.sender].downvoted.add(params.block_slug)

    @sp.entry_point
    def vote(self, params):
        """
        Vote on a funding block
        """
        sp.verify(self.data.profiles.contains(sp.sender), "User not registered")
        sp.verify(self.data.profiles[sp.sender].donated > 0, "User never donated")
        sp.verify(self.data.block[params.block_slug].active, "Block is not active")
        sp.verify(params.amount <= sp.balance, "Not enough tokens")
        sp.verify(params.amount > sp.mutez(0), "Amount must be positive")
        sp.verify(~self.data.profiles[sp.sender].voted.contains(params.block_slug), "Already voted")

        average = self.data.block[params.block_slug].final_amount
        donated = self.data.profiles[sp.sender].donated
        voters_weight = self.data.block[params.block_slug].voters_weight
        number_of_voters = sp.len(self.data.block[params.block_slug].voters)
        average = (average*number_of_voters + donated*params.amount) / (voters_weight+donated)
        self.data.block[params.block_slug].final_amount = average
        
        self.data.block[params.block_slug].voters_weight += donated
        self.data.block[params.block_slug].voters[sp.sender] = params.amount
        self.data.profiles[sp.sender].voted[params.block_slug] = params.amount
