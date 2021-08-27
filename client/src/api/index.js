import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";

export const Tezos = new TezosToolkit(process.env.REACT_APP_RPC_URL);
export const Wallet = new BeaconWallet({
  name: process.env.REACT_APP_WALLET_NAME,
});
