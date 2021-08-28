import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import axios from "axios";

export const Tezos = new TezosToolkit(process.env.REACT_APP_RPC_URL);
export const Wallet = new BeaconWallet({
  name: process.env.REACT_APP_WALLET_NAME,
});

// Contract Interaction
export const registerUser = async (bio, name) => {
  try {
    const hash = await Tezos.contract
      .at(process.env.REACT_APP_CONTRACT_ADDRESS)
      .then((contract) => contract.methods.register(bio, name).send())
      .then((op) => op.confirmation(1).then(() => op.opHash));
    return { result: true, message: hash };
  } catch (error) {
    return { result: false, message: error };
  }
};

export const updateProfile = async (bio, name) => {
  try {
    const hash = await Tezos.contract
      .at(process.env.REACT_APP_CONTRACT_ADDRESS)
      .then((contract) => contract.methods.update_profile(bio, name).send())
      .then((op) => op.confirmation(1).then(() => op.opHash));
    return { result: true, message: hash };
  } catch (error) {
    return { result: false, message: error };
  }
};

export const fundingBlockify = async ({
  actions,
  deadline,
  description,
  image,
  latitude,
  legal_statements,
  longitude,
  slug,
  target_amount,
  thankyou,
  title,
}) => {
  try {
    const hash = await Tezos.contract
      .at(process.env.REACT_APP_CONTRACT_ADDRESS)
      .then((contract) =>
        contract.methods
          .funding_blockify(
            actions,
            deadline,
            description,
            image,
            latitude,
            legal_statements,
            longitude,
            slug,
            target_amount,
            thankyou,
            title
          )
          .send()
      )
      .then((op) => op.confirmation(1).then(() => op.opHash));
    return { result: true, message: hash };
  } catch (error) {
    return { result: false, message: error };
  }
};

// API Calls
export const getUser = async (address) => {
  try {
    const body = await axios.get(
      process.env.REACT_APP_API_URL +
        "/contracts/" +
        process.env.REACT_APP_CONTRACT_ADDRESS +
        "/bigmaps/profiles/keys/" +
        address
    );
    return body.data.value;
  } catch (error) {
    return error;
  }
};

export const getBlock = async (address) => {
  try {
    const body = await axios.get(
      process.env.REACT_APP_API_URL +
        "/contracts/" +
        process.env.REACT_APP_CONTRACT_ADDRESS +
        "/bigmaps/blocks/keys/" +
        address
    );
    console.log(body.data.blocks);
    return body.data.blocks;
  } catch (error) {
    return error;
  }
};

export const getAllBlocks = async () => {
  try {
    const body = await axios.get(
      process.env.REACT_APP_API_URL +
        "/contracts/" +
        process.env.REACT_APP_CONTRACT_ADDRESS +
        "/bigmaps/blocks/keys/"
    );
    console.log(body.data.blocks);
    return body.data.blocks;
  } catch (error) {
    return error;
  }
};
