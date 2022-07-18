from chinstrap.originations import getContract


def deploy(chinstrapState, network, accounts):
    contract = getContract("Funding_Blocks_Certificates")
    initial_storage = contract.storage.encode({
        "administrator": "tz1bb299QQuWXuYbynKzPfdVftmZdAQrvrGN",
        "all_tokens": 0,
        "ledger": {},
        "metadata": {
            "": bytes("ipfs://QmQscMBDeb6PdbSmv2sm68xrZABin9rY7bdgzTBKaiC3WW", 'ascii')
        },
        "operators": {},
        "paused": False,
        "token_metadata": {}
    })
    return initial_storage, contract
