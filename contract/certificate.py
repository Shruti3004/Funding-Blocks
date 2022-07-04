import smartpy as sp

FA2 = sp.io.import_script_from_url("https://smartpy.io/dev/templates/FA2.py")


class FundingCertis(FA2.FA2):
    @sp.onchain_view(pure=True)
    def count_tokens(self):
        sp.result(self.data.all_tokens)


sp.add_compilation_target(
    "Funding Blocks Certificates",
    FundingCertis(
        admin   = sp.address("tz1bb299QQuWXuYbynKzPfdVftmZdAQrvrGN"),
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
