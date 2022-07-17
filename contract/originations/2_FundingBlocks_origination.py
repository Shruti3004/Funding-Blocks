from chinstrap.originations import getContract


def deploy(chinstrapState, network, accounts):
    contract = getContract("Funding_Blocks")
    initial_storage = contract.storage.encode({
        "administrator": "tz1bb299QQuWXuYbynKzPfdVftmZdAQrvrGN",
        "active_blocks": 0,
        "certificates": "tz1bb299QQuWXuYbynKzPfdVftmZdAQrvrGN",
        "profiles": {},
        "blocks": {}
    })
    return initial_storage, contract
