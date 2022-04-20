import { machineContractAddress, tozziDuckNum, withdrawer } from "./constants";
import { getFloat, getInt } from "./common";
import jsonMachineContract from "../contracts/TheAmazingTozziDuckMachine.json";
import Web3 from "web3";
import { ethers } from "ethers";
import axios from "axios";
import { Moralis } from "moralis";

let mca = machineContractAddress;
const web3 = new Web3(window.ethereum);
let machineContract = new web3.eth.Contract(jsonMachineContract.abi, mca);
console.log("interact machineContract: ", machineContract);
const ethereumProvider = new ethers.providers.Web3Provider(window.ethereum);

const getTxResult = async (promise) => {
  try {
    const tx = await promise;
    const res = await tx.wait();
    console.log("interact tx result: ", res);
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
  } catch (error) {
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
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
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
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
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
    tozziDucksEnabled: machineConfig.tozziDucksEnabled,
    customDucksEnabled: machineConfig.customDucksEnabled,
    balance: getFloat(balance),
    burnWindow: getInt(burnWindow),
    ownershipTokenId,
    owner,
  };
  console.log("interact machineConfig: ", data);
  return data;
};

export const fetchDucks = async (ducks) => {
  console.log("interact raw ducks: ", ducks);
  const totalSupply = await machineContract.methods.totalSupply().call();
  console.log("interact totalSupply: ", totalSupply);
  const machineConfig = await fetchMachineConfig();
  const { burnWindow, ownershipTokenId } = machineConfig;
  const blockObj = await web3.eth.getBlock(await web3.eth.getBlockNumber());
  const { timestamp } = blockObj;
  let newDucks = [...ducks];
  let promises = [];
  for (let i = 0; i < totalSupply; i++) {
    console.log("interact duck index: ", i);
    promises.push(
      await (async () => {
        const tokenId = parseInt(
          await machineContract.methods.tokenByIndex(i).call()
        );
        console.log("tokenId: ", tokenId);
        if (tokenId === ownershipTokenId) return;
        let duck = {};
        const index = newDucks.findIndex((e) => e.id === tokenId);
        if (index < 0) {
          newDucks.push(duck);
        } else {
          duck = newDucks[index];
        }
        const tokenURI = await machineContract.methods.tokenURI(tokenId).call();
        console.log("interact tokenURI: ", tokenURI);
        const tokenURIRes = await axios.get(tokenURI);
        if (tokenURIRes.statusText === "OK") {
          duck.image = tokenURIRes.data.image;
        }
        const owner = await machineContract.methods.ownerOf(tokenId).call();
        console.log("owner of token: ", owner);
        duck.owner = owner;
        if (tokenId >= tozziDuckNum) {
          const hatchedTime = parseInt(
            await machineContract.methods.customDuckHatchedTimes(tokenId).call()
          );
          duck.isCustom = true;
          duck.restTimestamp = burnWindow - (timestamp - hatchedTime);
        }
      })()
    );
  }
  await Promise.all(promises);
  console.log("interact newDucks: ", newDucks);
  return newDucks;
};

export const mintTozziDuck = async (data) => {
  const machineContract = getMachineContract();
  const machineConfig = await machineContract.machineConfig();
  const enabled = machineConfig.tozziDucksEnabled;
  if (!enabled) {
    return {
      status: "😥 Buying tozzi duck was restricted.",
    };
  }
  const price = machineConfig.tozziDuckPrice;
  // console.log("tozzi duck price: ", price);
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
  const enabled = machineConfig.customDucksEnabled;
  if (!enabled) {
    return {
      status: "😥 Buying custom duck was restricted.",
    };
  }
  const price = machineConfig.customDuckPrice;
  // console.log("custom duck price: ", price);
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
      withdrawer,
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

export const initInteract = async () => {};
