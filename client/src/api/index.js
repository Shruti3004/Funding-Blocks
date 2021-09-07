import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import axios from "axios";
import swal from "sweetalert";

export const Tezos = new TezosToolkit(process.env.REACT_APP_RPC_URL);
export const Wallet = new BeaconWallet({
  name: process.env.REACT_APP_WALLET_NAME,
});

export const getAccount = async () => {
  try {
    const activeAccount = await Wallet.client.getActiveAccount();
    if (activeAccount) {
      Tezos.setWalletProvider(Wallet);
      return { result: true, address: activeAccount.address };
    } else return { result: false, address: null };
  } catch (error) {
    return { result: false, error };
  }
};

export const logIn = () =>
  new Promise(async (resolve, reject) => {
    await Wallet.requestPermissions({
      network: {
        type: "granadanet",
      },
    });
    Tezos.setWalletProvider(Wallet);
    resolve();
  });

export const logOut = async () => {
  await Wallet.clearActiveAccount();
  logIn();
};

// Contract Interaction
export const registerUser = async (bio, name) => {
  try {
    const hash = await Tezos.wallet
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
    const hash = await Tezos.wallet
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
    const hash = await Tezos.wallet
      .at(process.env.REACT_APP_CONTRACT_ADDRESS)
      .then((contract) =>
        contract.methods
          .funding_blockify(
            actions,
            description,
            image,
            latitude,
            legal_statements,
            longitude,
            slug,
            parseInt(target_amount * 1000000),
            thankyou,
            title
          )
          .send()
      )
      .then((op) => op.confirmation(1).then(() => op.opHash))
      .then(() => swal("You're a hero", "Wait for other heroes to donate", "success"));
    return { result: true, message: hash };
  } catch (error) {
    console.log(error);
    if (error.name === "UnconfiguredSignerError") {
      swal("Oops!", "You need to sign up first", "error");
      return;
    }
    swal("Oops!", error.data[1].with.string, "error");
    return { result: false, message: error };
  }
};

export const editBlock = async ({
  actions,
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
    const hash = await Tezos.wallet
      .at(process.env.REACT_APP_CONTRACT_ADDRESS)
      .then((contract) =>
        contract.methods
          .edit_funding_block(
            actions,
            description,
            image,
            latitude,
            legal_statements,
            longitude,
            slug,
            parseInt(target_amount * 1000000),
            thankyou,
            title
          )
          .send()
      )
      .then((op) => op.confirmation(1).then(() => op.opHash))
      .then(() => swal("You're a hero", "Wait for other heroes to donate", "success"));
    return { result: true, message: hash };
  } catch (error) {
    console.log(error);
    if (error.name === "UnconfiguredSignerError") {
      swal("Oops!", "You need to sign up first", "error");
      return;
    }
    swal("Oops!", error.data[1].with.string, "error");
    return { result: false, message: error };
  }
};

export const deleteBlock = async (slug) => {
  try {
    const hash = await Tezos.wallet
      .at(process.env.REACT_APP_CONTRACT_ADDRESS)
      .then((contract) => contract.methods.delete_block(String(slug)).send())
      .then((op) => op.confirmation(1).then(() => op.opHash));
    return { result: true, message: hash };
  } catch (error) {
    return { result: false, message: error };
  }
};

export const donate = async (amount) => {
  try {
    const hash = Tezos.wallet
      .at(process.env.REACT_APP_CONTRACT_ADDRESS)
      .then((contract) => contract.methods.donate("").send({ amount }))
      .then((op) => op.confirmation(1).then(() => op.opHash))
      .then(() => swal("Yay!", "Seems like you're a hero", "success"));

    return { result: true, message: hash };
  } catch (error) {
    if (error.name === "UnconfiguredSignerError") {
      swal("Oops!", "You need to sign up first", "error");
      return;
    }
    swal("Oops!", "Seems like we couldn't fetch the info", "error");
    return { result: false, message: error };
  }
};

export const downVote = async (slug) => {
  try {
    const hash = await Tezos.wallet
      .at(process.env.REACT_APP_CONTRACT_ADDRESS)
      .then((contract) => contract.methods.downvote(String(slug)).send())
      .then((op) => op.confirmation(1).then(() => op.opHash));
    return { result: true, message: hash };
  } catch (error) {
    if (error.name === "UnconfiguredSignerError") {
      swal("Oops!", "You need to sign up first", "error");
      return;
    }
    return { result: false, message: error };
  }
};

export const upVote = async (slug) => {
  try {
    const hash = await Tezos.wallet
      .at(process.env.REACT_APP_CONTRACT_ADDRESS)
      .then((contract) => contract.methods.upvote(String(slug)).send())
      .then((op) => op.confirmation(1).then(() => op.opHash))
      .then(() => swal("Yay!", "Seems like you're a hero", "success"));

    return { result: true, message: hash };
  } catch (error) {
    if (error.name === "UnconfiguredSignerError") {
      swal("Oops!", "You need to sign up first", "error");
      return;
    }
    swal("Oops!", error.data[1].with.string, "error");
    return { result: false, message: error };
  }
};

export const claimBlockAmount = async (slug) => {
  try {
    const hash = await Tezos.wallet
      .at(process.env.REACT_APP_CONTRACT_ADDRESS)
      .then((contract) => contract.methods.claim_block_amount(String(slug)).send())
      .then((op) => op.confirmation(1).then(() => op.opHash));
    return { result: true, message: hash };
  } catch (error) {
    if (error.name === "UnconfiguredSignerError") {
      swal("Oops!", "You need to sign up first", "error");
      return;
    }
    swal("Oops!", "You cannot claim other's balance", "error");
    return { result: false, message: error };
  }
};

export const withdrawBack = async (mutez) => {
  try {
    const hash = await Tezos.wallet
      .at(process.env.REACT_APP_CONTRACT_ADDRESS)
      .then((contract) => contract.methods.withdraw_back(parseInt(mutez)).send())
      .then((op) => op.confirmation(1).then(() => op.opHash));
    return { result: true, message: hash };
  } catch (error) {
    if (error.name === "UnconfiguredSignerError") {
      swal("Oops!", "You need to sign up first", "error");
      return;
    }
    return { result: false, message: error };
  }
};

export const vote = async (mutez, slug) => {
  try {
    const hash = await Tezos.wallet
      .at(process.env.REACT_APP_CONTRACT_ADDRESS)
      .then((contract) => contract.methods.vote(parseInt(mutez), String(slug)).send())
      .then((op) => op.confirmation(1).then(() => op.opHash))
      .then(() => swal("Yay!", "Seems like you're a hero", "success"));

    return { result: true, message: hash };
  } catch (error) {
    console.log(error);
    if (error.name === "UnconfiguredSignerError") {
      swal("Oops!", "You need to sign up first", "error");
      return;
    }
    swal("Oops!", error.data[1].with.string, "error");
    return { result: false, message: error };
  }
};

export const getBalance = async (address = process.env.REACT_APP_CONTRACT_ADDRESS) => {
  try {
    const balance = await Tezos.tz.getBalance(address).then((mutez) => mutez);
    return balance;
  } catch (error) {
    return error;
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

export const getBlock = async (slug) => {
  try {
    const body = await axios.get(
      process.env.REACT_APP_API_URL +
        "/contracts/" +
        process.env.REACT_APP_CONTRACT_ADDRESS +
        "/bigmaps/blocks/keys/" +
        slug
    );
    return body.data;
  } catch (error) {
    swal("Oops!", "Something went wrong", "error");
    return error;
  }
};

export const getAllBlocks = async () => {
  try {
    const body = await axios.get(
      process.env.REACT_APP_API_URL +
        "/contracts/" +
        process.env.REACT_APP_CONTRACT_ADDRESS +
        "/bigmaps/blocks/keys"
    );
    return body.data.sort(
      (a, b) => parseInt(b.value.upvoted_average) - parseInt(a.value.upvoted_average)
    );
  } catch (error) {
    return error;
  }
};

export const getFeaturedBlocks = async () => {
  try {
    const blocks = await getAllBlocks();
    return blocks.slice(0, 3);
  } catch (error) {
    return error;
  }
};

export const isAuthor = async (slug) => {
  try {
    const block = await getBlock(slug);
    const user = await getAccount();
    return block.value.author == user.address;
  } catch (error) {
    return error;
  }
};

export const isLiked = async (slug) => {
  try {
    const user = await getAccount();
    const userDetails = await getUser(user.address);
    if (!userDetails) return false;
    return userDetails.upvoted.includes(slug);
  } catch (error) {
    return error;
  }
};

export const getCertificateDetails = async (id) => {
  return await axios.get(
    process.env.REACT_APP_API_URL +
      "/contracts/" +
      process.env.REACT_APP_CONTRACT_ADDRESS +
      "/bigmaps/token_metadata/keys/" +
      id
  );
};

export const getCertificate = async (id, address) => {
  try {
    let data = (await getCertificateDetails(id)).data.value;
    const user = await getUser(address);
    const slugs = Object.keys(user.certificate_token_id);
    const slug = slugs.map((key) => {
      if (user.certificate_token_id[key] == id) return key;
    })[0];
    const block = (await getBlock(slug)).value;
    data.token_info.block_slug = slug;
    data.token_info.donor_name = user.name;
    data.token_info.block_title = block.title;
    data.token_info.donor_address = address;
    data.token_info.issuer_address = block.author;
    data.token_info.effective_donation = parseFloat(
      (parseInt(user.donated) * parseInt(block.final_amount)) / (await getBalance()) / 1000000
    ).toFixed(6);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCertificates = async (address) => {
  try {
    const tokens = (await getUser(address)).certificate_token_id;
    const slugs = Object.keys(tokens);
    let certificates = [];
    for (let slug of slugs) {
      certificates.push(await getCertificate(tokens[slug], address));
    }
    return certificates;
  } catch (error) {
    console.log(error);
  }
};

export const getLocation = async () => {
  try {
    const location = await axios.get(
      "http://api.ipstack.com/check?access_key=" + process.env.REACT_APP_LOCATION_API_KEY
    );
    return { lat: location.data.latitude, lng: location.data.longitude };
  } catch (error) {
    console.log(error);
  }
};
