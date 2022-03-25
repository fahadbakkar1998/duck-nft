import Web3 from "web3";
import { machineContractAddress } from "./utils/constants";
import jsonMachineContract from "./contracts/TheAmazingTozziDuckMachine.json";

export const middleware = async () => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    const machineContract = new web3.eth.Contract(
      jsonMachineContract.abi,
      machineContractAddress
    );

    window.ethereum.on("accountsChanged", (accounts) => {
      // console.log("accountsChanged", accounts);
    });

    window.ethereum.on("chainChanged", (chainId) => {
      // console.log("chainChanged", chainId);
    });

    window.ethereum.on("message", (message) => {
      // console.log("message", message);
    });

    // console.log(machineContract);
  }
};
