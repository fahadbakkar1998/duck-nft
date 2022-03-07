import { machineAddress, projectAddress } from "./constants";
import projectContract from "../contracts/ChainsawProjects.json";
import machineContract from "../contracts/TheAmazingTozziDuckMachine.json";
import Web3 from "web3";

const web3 = new Web3(
  "https://rinkeby.infura.io/v3/a6dceddd72b74133aab4c0665a676406"
);
const project = new web3.eth.Contract(projectContract.abi, projectAddress);
const machine = new web3.eth.Contract(machineContract.abi, machineAddress);
project.events.allEvents().on("data", (e) => {
  console.log("project events", e);
});
machine.events.allEvents().on("data", (e) => {
  console.log("machine events", e);
});

const sendTransaction = async (params) => {
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [params],
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

export const fetchDuckMintedEvent = async (duckData) => {
  let promises = [];
  for (let i = 0; i < duckData.length; i++) {
    promises.push(
      machine.methods
        .ownerOf(i)
        .call()
        .then((res) => {
          duckData[i].owner = res;
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        })
    );
  }
  await Promise.all(promises);
  return duckData;
};

export const mintTozziDuck = async (data) => {
  const price = await machine.methods.tozziDuckPrice().call();
  console.log("price", price);
  const res = await sendTransaction({
    from: data.address,
    to: machineAddress,
    value: price,
    data: machine.methods
      .mintTozziDuck(data.id, data.webp, data.proof)
      .encodeABI(),
  });
  return res;
};
