import { useState, useEffect } from "react";
import "./index.scss";
import {
  connectWallet,
  getCurrentWalletConnected,
  fetchMachineConfig,
  fetchDucks,
} from "../../../../utils/interact";
import { getFloat, getInt } from "../../../../utils/common";
import useMachineStore from "../../../../store";
import hourglass from "../../../../assets/img/hourglass.gif";
import { MachineMode } from "../../../../utils/constants";

const WalletConnect = (props: any) => {
  const [status, setStatus] = useState<any>("Please connect your wallet.");
  const address = useMachineStore((state) => state.address);
  const setAddress = useMachineStore((state) => state.setAddress);
  const currentMode = useMachineStore((state) => state.currentMode);
  const setCurrentMode = useMachineStore((state) => state.setCurrentMode);
  const setMachineConfig = useMachineStore((state) => state.setMachineConfig);
  const ducks = useMachineStore((state) => state.ducks);
  const setDucks = useMachineStore((state) => state.setDucks);
  const setCustomDuckData = useMachineStore((state) => state.setCustomDuckData);

  const getWalletConnected = async () => {
    const { address, status } = await getCurrentWalletConnected();
    setAddress(address);
    setStatus(status);
  };

  const handleClick = async () => {
    const { address, status } = await connectWallet();
    setAddress(address);
    setStatus(status);
  };

  const addWalletListener = () => {
    getWalletConnected();
    if ((window as any).ethereum) {
      (window as any).ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
      (window as any).ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }
  };

  useEffect(() => {
    addWalletListener();
  }, []);

  useEffect(() => {
    if (address) {
      (async () => {
        setCurrentMode(MachineMode.Syncing);
        const machineConfig = await fetchMachineConfig();
        setMachineConfig(machineConfig);
        console.log("WalletConnect ducks: ", ducks);
        const newDucks = await fetchDucks(ducks);
        setDucks(newDucks);
        setCurrentMode(MachineMode.Shopping);
      })();
    } else {
      setCurrentMode(MachineMode.Off);
    }
  }, [address]);

  return (
    <div className={`inner-shadow WalletConnect`}>
      <div
        className={`
            text-white                                 
            flex flex-col space-y-1
            text-sm
            mb-2
          `}
        onClick={handleClick}
      >
        <div
          className={`
              btn-connect 
              text-white hover:text-black hover:bg-white
              px-4 text-lg
            `}
          onClick={handleClick}
        >
          {currentMode === MachineMode.Syncing && (
            <>
              <span className="ml-2">Syncing Duck Data</span>
              <div className="inline-block h-6 w-6 pt-1">
                <img src={hourglass} alt="Hourglass" />
              </div>
            </>
          )}
          {currentMode === MachineMode.Off && (
            <>
              <span>{">"}</span>
              <span className="ml-2">Connect Wallet</span>
            </>
          )}
        </div>
        <div className="flex justify-center opacity-75">
          <div className="mr-2">TM &amp; Ⓒ</div>
          <div>CHAIN/SAW CORP, 2022</div>
        </div>
        <div className="opacity-75">LICENSED BY JIM TOZZI</div>
        <div className="opacity-75">FOR USE ON ETHEREUM BLOCKCHAIN</div>
      </div>
    </div>
  );
};

export default WalletConnect;
