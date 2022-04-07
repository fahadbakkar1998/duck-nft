import { machineContractAddress, tozziDuckNum, withdrawer } from "./constants";
import jsonMachineContract from "../contracts/TheAmazingTozziDuckMachine.json";
import Web3 from "web3";
import { ethers } from "ethers";
import axios from "axios";

const web3 = new Web3(
  // "https://rinkeby.infura.io/v3/a6dceddd72b74133aab4c0665a676406"
  window.ethereum
);
const ethereumProvider = new ethers.providers.Web3Provider(window.ethereum);

const getTxResult = async (promise) => {
  try {
    const tx = await promise;
    const res = await tx.wait();
    // console.log("Tx Result: ", res);
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
    machineContractAddress,
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

export const fetchMachineData = async () => {
  const machineContract = getMachineContract();
  const machineSetting = await machineContract.machineSetting();
  const tozziDuckPrice = web3.utils.fromWei(
    machineSetting.tozziDuckPrice._hex,
    "ether"
  );
  const customDuckPrice = web3.utils.fromWei(
    machineSetting.customDuckPrice._hex,
    "ether"
  );
  const balance = web3.utils.fromWei(
    await web3.eth.getBalance(machineContractAddress),
    "ether"
  );
  const burnWindow = await machineContract.BURN_WINDOW();
  // console.log("balance: ", balance);
  // console.log("burnWindow: ", burnWindow);
  return {
    ...machineSetting,
    tozziDuckPrice,
    customDuckPrice,
    balance,
    burnWindow,
  };
};

export const fetchTozziDuck = async (tozziDuckData) => {
  const machineContract = getMachineContract();
  let promises = [];
  for (let i = 0; i < tozziDuckNum; i++) {
    promises.push(
      machineContract
        .ownerOf(i)
        .then((res) => {
          if (tozziDuckData[i]) {
            tozziDuckData[i].owner = res;
          }
        })
        .catch((e) => {
          // console.error(e);
        })
    );
  }
  await Promise.all(promises);
  // console.log("tozzi duck data: ", tozziDuckData);
  return tozziDuckData;
};

export const fetchCustomDuck = async () => {
  const machineContract = getMachineContract();
  let promises = [];
  let customDuckData = [];
  const machineSetting = await machineContract.machineSetting();
  const maxCustomDuckNum = machineSetting.maxCustomDucks;
  // console.log("max custom ducks: ", maxCustomDuckNum);
  const burnWindow = await machineContract.BURN_WINDOW();
  // console.log("burn window: ", burnWindow);
  const blockObj = await web3.eth.getBlock(await web3.eth.getBlockNumber());
  const curBlockTimestamp = blockObj.timestamp;
  // console.log("current block timestamp: ", curBlockTimestamp);
  for (let i = 0; i < maxCustomDuckNum; i++) {
    // console.log("current custom duck index: ", tozziDuckNum + i);
    promises.push(
      // get token uri
      machineContract
        .tokenURI(tozziDuckNum + i)
        .then(async (res) => {
          const tokenUriRes = await axios.get(res);
          if (tokenUriRes.status === 200) {
            // get owner
            const ownerOfRes = await machineContract
              .ownerOf(tozziDuckNum + i)
              .catch((e) => {
                // console.error(e);
              });
            if (!ownerOfRes) return;
            // console.log("ownerOfRes", ownerOfRes);
            // get hatched time
            const hatchedTime = await machineContract.customDuckHatchedTimes(
              tozziDuckNum + i
            );
            // console.log("hatched time: ", hatchedTime);
            tokenUriRes.data.id = tozziDuckNum + i;
            tokenUriRes.data.owner = ownerOfRes;
            tokenUriRes.data.restTimestamp =
              burnWindow - (curBlockTimestamp - hatchedTime);
            customDuckData[i] = tokenUriRes.data;
          }
        })
        .catch((e) => {
          // console.error(e);
        })
    );
  }
  await Promise.all(promises);
  const CDD = customDuckData.filter((a) => a);
  // console.log("custom duck data: ", CDD);
  return CDD;
};

export const mintTozziDuck = async (data) => {
  const machineContract = getMachineContract();
  const machineSetting = await machineContract.machineSetting();
  const enabled = machineSetting.tozziDucksEnabled;
  if (!enabled) {
    return {
      status: "😥 Buying tozzi duck was restricted.",
    };
  }
  const price = machineSetting.tozziDuckPrice;
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
  const machineSetting = await machineContract.machineSetting();
  const enabled = machineSetting.customDucksEnabled;
  if (!enabled) {
    return {
      status: "😥 Buying custom duck was restricted.",
    };
  }
  const price = machineSetting.customDuckPrice;
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
  const setting = data.machineSetting;
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
    machineContract.setMachineSetting(data.machineSetting)
  );
  return res;
};
