import { machineContractAddress, tozziDuckNum, withdrawer } from "./constants";
import { getFloat, getInt } from "./common";
import jsonMachineContract from "../contracts/TheAmazingTozziDuckMachine.json";
import Web3 from "web3";
import { ethers } from "ethers";
import axios from "axios";
import { DuckData, MintStatus } from "../types/types";
import { Moralis } from "moralis";
import { AbiItem } from "web3-utils";

declare var window: any;
let mca = machineContractAddress;
let w = withdrawer;
let web3 = new Web3(window.ethereum);
let machineContract = new web3.eth.Contract(
  jsonMachineContract.abi as AbiItem[],
  mca
);
let ethereumProvider = new ethers.providers.Web3Provider(window.ethereum);

const getTxResult = async (promise: Promise<any>) => {
  try {
    const tx = await promise;
    const res = await tx.wait();
    console.log("interact_tx_result: ", res);
    if (res.transactionHash) {
      return {
        success: true,
        status: (
          <span>
            <p>
              ✅ Please check your transaction on rinkeby.etherscan.io
              <br />
              <a
                target="_blank"
                href={`https://rinkeby.etherscan.io/tx/` + res.transactionHash}
                rel="noreferrer"
              >
                {"https://rinkeby.etherscan.io/tx/" + res.transactionHash}
              </a>
            </p>
          </span>
        ),
      };
    } else {
      return {
        status: "😥 Transaction is failed.",
      };
    }
  } catch (error: any) {
    return {
      status: "😥 " + error.message,
    };
  }
};

const getMachineContract = () => {
  const contract = new ethers.Contract(
    mca,
    jsonMachineContract.abi,
    ethereumProvider.getSigner()
  );
  return contract;
};

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const chainId = await web3.eth.getChainId();
      if (chainId === 4) {
        // Rinkeby Test Network
        return {
          status: "👆🏽 Write a message in the text-field above.",
          address: addressArray[0],
        };
      } else {
        return {
          address: "",
          status: "🦊 Please select correct network.",
        };
      }
    } catch (error: any) {
      return {
        address: "",
        status: "😥 " + error.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://metamask.io/download.html`}
            >
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        const chainId = await web3.eth.getChainId();
        if (chainId === 4) {
          // Rinkeby Test Network
          return {
            address: addressArray[0],
            status: "👆🏽 Write a message in the text-field above.",
          };
        } else {
          return {
            address: "",
            status: "🦊 Please select correct network.",
          };
        }
      } else {
        return {
          address: "",
          status: "",
        };
      }
    } catch (error: any) {
      return {
        address: "",
        status: "😥 " + error.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://metamask.io/download.html`}
            >
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const fetchMachineConfig = async () => {
  const machineConfig = await machineContract.methods.machineConfig().call();
  const balance = web3.utils.fromWei(await web3.eth.getBalance(mca), "ether");
  const burnWindow = await machineContract.methods.BURN_WINDOW().call();
  const ownershipTokenId = parseInt(
    await machineContract.methods.OWNERSHIP_TOKEN_ID().call()
  );
  const owner = await machineContract.methods.ownerOf(ownershipTokenId).call();
  const data = {
    tozziDuckPrice: getFloat(
      web3.utils.fromWei(machineConfig.tozziDuckPrice, "ether")
    ),
    customDuckPrice: getFloat(
      web3.utils.fromWei(machineConfig.customDuckPrice, "ether")
    ),
    maxCustomDucks: getInt(machineConfig.maxCustomDucks),
    tozziDuckMintStatus: getInt(machineConfig.tozziDuckMintStatus),
    customDuckMintStatus: getInt(machineConfig.customDuckMintStatus),
    balance: getFloat(balance),
    burnWindow: getInt(burnWindow),
    ownershipTokenId,
    owner,
  };
  console.log("interact_machineConfig: ", data);
  return data;
};

export const getLastTokenId = async () => {
  const totalSupply = await machineContract.methods.totalSupply().call();
  console.log("interact_totalSupply: ", totalSupply);
  const tokenId = parseInt(
    await machineContract.methods.tokenByIndex(totalSupply - 1).call()
  );
  console.log("interact_tokenId: ", tokenId);
  return tokenId;
};

export const fetchDucks = async (ducks: Array<DuckData>) => {
  console.log("interact_raw_ducks: ", ducks);
  const totalSupply = await machineContract.methods.totalSupply().call();
  console.log("interact_totalSupply: ", totalSupply);
  const machineConfig = await fetchMachineConfig();
  const { burnWindow, ownershipTokenId } = machineConfig;
  const blockObj = await web3.eth.getBlock(await web3.eth.getBlockNumber());
  let { timestamp } = blockObj;
  let newDucks = [...ducks];
  let promises: Promise<void>[] = [];

  const formatDuck = async (i: number) => {
    const tokenId = parseInt(
      await machineContract.methods.tokenByIndex(i).call()
    );
    console.log("interact_tokenId: ", tokenId);
    if (tokenId === ownershipTokenId) return;
    let duck = {
      id: 0,
      proof: [""],
      webp: "",
      owner: "",
      salePrice: 0,
      isCustom: false,
      restTimestamp: 0,
      image: "",
    };
    const index = newDucks.findIndex((e) => e.id === tokenId);
    if (index < 0) {
      newDucks.push(duck);
    } else {
      duck = newDucks[index];
    }
    const tokenURI = await machineContract.methods.tokenURI(tokenId).call();
    console.log("interact_tokenURI: ", tokenURI);
    const tokenURIRes = await axios.get(tokenURI);
    if (tokenURIRes.statusText === "OK") {
      duck.image = tokenURIRes.data.image;
    }
    const owner = await machineContract.methods.ownerOf(tokenId).call();
    console.log("interact_owner_of_token: ", owner);
    duck.owner = owner;
    if (tokenId >= tozziDuckNum) {
      const hatchedTime = parseInt(
        await machineContract.methods.customDuckHatchedTimes(tokenId).call()
      );
      duck.isCustom = true;
      duck.restTimestamp = burnWindow - (Number(timestamp) - hatchedTime);
    }
  };

  for (let i = 0; i < totalSupply; i++) {
    console.log("interact_duck_index: ", i);
    promises.push(formatDuck(i));
  }

  await Promise.all(promises);
  console.log("interact_newDucks: ", newDucks);
  return newDucks;
};

export const mintTozziDuck = async (data) => {
  const machineContract = getMachineContract();
  const machineConfig = await machineContract.machineConfig();
  // if (machineConfig.tozziDuckMintStatus === MintStatus.Disabled) {
  //   return {
  //     status: "😥 Buying tozzi duck was restricted.",
  //   };
  // }
  const price = machineConfig.tozziDuckPrice;
  console.log("interact_tozzi_duck_price: ", price);
  const res = await getTxResult(
    machineContract.mintTozziDuck(data.id, data.webp, data.proof, {
      value: ethers.BigNumber.from(price)._hex,
    })
  );
  return res;
};

export const mintCustomDuck = async (data) => {
  const machineContract = getMachineContract();
  const machineConfig = await machineContract.machineConfig();
  // if (machineConfig.customDuckMintStatus === MintStatus.Disabled) {
  //   return {
  //     status: "😥 Buying custom duck was restricted.",
  //   };
  // }
  const price = machineConfig.customDuckPrice;
  console.log("interact_custom_duck_price: ", price);
  const res = await getTxResult(
    machineContract.mintCustomDuck(data.base64data, {
      value: ethers.BigNumber.from(price)._hex,
    })
  );
  return res;
};

export const burnRenegadeDuck = async (data) => {
  const machineContract = getMachineContract();
  const res = await getTxResult(
    machineContract.burnRenegadeDuck(data.duckId, data.reason)
  );
  return res;
};

export const withdraw = async (data) => {
  const machineContract = getMachineContract();
  const res = await getTxResult(
    machineContract.withdraw(
      w,
      web3.utils.toWei(data.amount.toString(), "ether")
    )
  );
  return res;
};

export const saveMachineSetting = async (data) => {
  const setting = data.machineConfig;
  setting.tozziDuckPrice = web3.utils.toWei(
    setting.tozziDuckPrice.toString(),
    "ether"
  );
  setting.customDuckPrice = web3.utils.toWei(
    setting.customDuckPrice.toString(),
    "ether"
  );
  const machineContract = getMachineContract();
  const res = await getTxResult(
    machineContract.setMachineConfig(data.machineConfig)
  );
  return res;
};

const serverUrl = "https://hrat1hho6zpj.usemoralis.com:2053/server"; // Moralis Server Url here
const appId = "MKl3nErOLCC79DLhcD0kF4OqfNWRJ04FxPKvNkc3"; // Moralis Server App ID here
Moralis.start({ serverUrl, appId });
const Collection = Moralis.Object.extend("Collection");
const Query = new Moralis.Query(Collection);

export const getMoralisData = async (name) => {
  Query.equalTo("name", name);
  const rows = await Query.find();
  if (rows.length) {
    return rows[0].get("value");
  }
};

export const initInteract = async () => {
  try {
    mca = await getMoralisData("contractAddress");
    const url = await getMoralisData("url");
    const apiKey = await getMoralisData("apiKey");
    w = await getMoralisData("withdrawer");
    const res = await axios.get(
      `https://${url}/api?module=contract&action=getabi&address=${mca}&apikey=${apiKey}`
    );
    if (res.status !== 200) return;
    const abi = JSON.parse(res.data.result);
    console.log("interact_abi: ", abi);
    machineContract = new web3.eth.Contract(abi, mca);
    console.log("interact_contractAddress: ", mca);
    console.log("interact_machineContract: ", machineContract);
  } catch (e) {
    console.error(e);
  }
};
