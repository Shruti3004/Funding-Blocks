from chinstrap.originations import getContract


def deploy(chinstrapState, network, accounts):
    contract = getContract("Funding_Blocks_Certificates")
    initial_storage = contract.storage.encode({
        "administrator": "tz1bb299QQuWXuYbynKzPfdVftmZdAQrvrGN",
        "all_tokens": 0,
        "ledger": {},
        "metadata": {
            "": "697066733A2F2F516D5173634D4244656236506462536D7632736D363878725A4142696E397259376264677A54424B616943335757"
        },
        "operators": {},
        "paused": False,
        "token_metadata": {}
    })
    return initial_storage, contract
