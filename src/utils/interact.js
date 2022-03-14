import {
  machineAddress,
  projectAddress,
  tozziDuckNum,
  withdrawer,
} from "./constants";
import projectContract from "../contracts/ChainsawProjects.json";
import machineContract from "../contracts/TheAmazingTozziDuckMachine.json";
import Web3 from "web3";
import { ethers } from "ethers";
import axios from "axios";

const web3 = new Web3(
  "https://rinkeby.infura.io/v3/a6dceddd72b74133aab4c0665a676406"
);
const project = new web3.eth.Contract(projectContract.abi, projectAddress);
const machine = new web3.eth.Contract(machineContract.abi, machineAddress);
project.events.allEvents().on("data", (e) => {
  console.log("project events: ", e);
});
machine.events.allEvents().on("data", (e) => {
  console.log("machine events: ", e);
});

const sendTransaction = async (data) => {
  try {
    const txHash = await window.ethereum.request({
      method: data.method,
      params: [data.params],
    });
    return {
      success: true,
      status: (
        <span>
          <p>
            ✅ Please check your transaction on rinkeby.etherscan.io
            <br />
            <a
              target="_blank"
              href={`https://rinkeby.etherscan.io/tx/` + txHash}
              rel="noreferrer"
            >
              {"https://rinkeby.etherscan.io/tx/" + txHash}
            </a>
          </p>
        </span>
      ),
    };
  } catch (error) {
    return {
      success: false,
      status: "Something went wrong: " + error.message,
    };
  }
};

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
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
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
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

export const fetchMachineData = async () => {
  const machineSetting = await machine.methods.machineSetting().call();
  machineSetting.tozziDuckPrice = web3.utils.fromWei(
    machineSetting.tozziDuckPrice,
    "ether"
  );
  machineSetting.customDuckPrice = web3.utils.fromWei(
    machineSetting.customDuckPrice,
    "ether"
  );

  const balance = web3.utils.fromWei(
    await web3.eth.getBalance(machineAddress),
    "ether"
  );
  const burnWindow = await machine.methods.BURN_WINDOW().call();
  console.log("balance", balance);
  console.log("burnWindow", burnWindow);
  return { ...machineSetting, balance, burnWindow };
};

export const fetchTozziDuck = async (tozziDuckData) => {
  let promises = [];
  for (let i = 0; i < tozziDuckNum; i++) {
    promises.push(
      machine.methods
        .ownerOf(i)
        .call()
        .then((res) => {
          if (tozziDuckData[i]) {
            tozziDuckData[i].owner = res;
          }
        })
        .catch(console.error)
    );
  }
  await Promise.all(promises);
  console.log("tozzi duck data: ", tozziDuckData);
  return tozziDuckData;
};

export const fetchCustomDuck = async () => {
  let promises = [];
  let customDuckData = [];
  const machineSetting = await machine.methods.machineSetting().call();
  const maxCustomDuckNum = machineSetting.maxCustomDucks;
  // console.log(maxCustomDuckNum);
  console.log("max custom ducks: ", maxCustomDuckNum);
  const burnWindow = await machine.methods.BURN_WINDOW().call();
  console.log("burn window: ", burnWindow);
  const blockObj = await web3.eth.getBlock(await web3.eth.getBlockNumber());
  const curBlockTimestamp = blockObj.timestamp;
  console.log("current block timestamp: ", curBlockTimestamp);
  for (let i = 0; i < maxCustomDuckNum; i++) {
    promises.push(
      // get token uri
      machine.methods
        .tokenURI(tozziDuckNum + i)
        .call()
        .then(async (res) => {
          const tokenUriRes = await axios.get(res);
          if (tokenUriRes.status === 200) {
            // get owner
            const ownerOfRes = await machine.methods
              .ownerOf(tozziDuckNum + i)
              .call()
              .catch(console.error);
            if (!ownerOfRes) return;
            // get hatched time
            const hatchedTime = await machine.methods
              .customDuckHatchedTimes(tozziDuckNum + i)
              .call();
            console.log("hatched time", hatchedTime);
            tokenUriRes.data.id = tozziDuckNum + i;
            tokenUriRes.data.owner = ownerOfRes;
            tokenUriRes.data.restTimestamp =
              burnWindow - (curBlockTimestamp - hatchedTime);
            customDuckData[i] = tokenUriRes.data;
          }
        })
        .catch(console.error)
    );
  }
  await Promise.all(promises);
  console.log("custom duck data: ", customDuckData);
  return customDuckData;
};

export const mintTozziDuck = async (data) => {
  const machineSetting = await machine.methods.machineSetting().call();
  const enabled = machineSetting.tozziDucksEnabled;
  if (!enabled) {
    return {
      status: "Sorry, Buying tozzi duck was restricted.",
    };
  }
  const price = machineSetting.tozziDuckPrice;
  console.log("tozzi duck price: ", price);
  const res = await sendTransaction({
    method: "eth_sendTransaction",
    params: {
      from: data.address,
      to: machineAddress,
      value: ethers.BigNumber.from(price)._hex,
      data: machine.methods
        .mintTozziDuck(data.id, data.webp, data.proof)
        .encodeABI(),
    },
  });
  return res;
};

export const mintCustomDuck = async (data) => {
  const machineSetting = await machine.methods.machineSetting().call();
  const enabled = machineSetting.customDucksEnabled;
  if (!enabled) {
    return {
      status: "Sorry, Buying custom duck was restricted.",
    };
  }
  const price = machineSetting.customDuckPrice;
  console.log("custom duck price: ", price);
  const res = await sendTransaction({
    method: "eth_sendTransaction",
    params: {
      from: data.address,
      to: machineAddress,
      value: ethers.BigNumber.from(price)._hex,
      data: machine.methods.mintCustomDuck(data.base64data).encodeABI(),
    },
  });
  return res;
};

export const burnRenegadeDuck = async (data) => {
  const res = await sendTransaction({
    method: "eth_sendTransaction",
    params: {
      from: data.address,
      to: machineAddress,
      data: machine.methods
        .burnRenegadeDuck(data.duckId, data.reason)
        .encodeABI(),
    },
  });
  return res;
};

export const withdraw = async (data) => {
  const res = await sendTransaction({
    method: "eth_sendTransaction",
    params: {
      from: data.address,
      to: machineAddress,
      data: machine.methods
        .withdraw(withdrawer, web3.utils.toWei(data.amount.toString(), "ether"))
        .encodeABI(),
    },
  });
  return res;
};

export const saveMachineSetting = async (data) => {
  const setting = data.machineSetting;
  setting.tozziDuckPrice = web3.utils.toWei(
    setting.tozziDuckPrice.toString(),
    "ether"
  );
  setting.customDuckPrice = web3.utils.toWei(
    setting.customDuckPrice.toString(),
    "ether"
  );
  const res = await sendTransaction({
    method: "eth_sendTransaction",
    params: {
      from: data.address,
      to: machineAddress,
      data: machine.methods.setMachineSetting(data.machineSetting).encodeABI(),
    },
  });
  return res;
};
