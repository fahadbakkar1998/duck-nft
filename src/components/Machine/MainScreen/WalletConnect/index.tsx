/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import "./index.scss";
import {
  connectWallet,
  getCurrentWalletConnected,
  fetchMachineConfig,
  fetchDucks,
} from "../../../../utils/interact";
import useMachineStore from "../../../../store";
import hourglass from "../../../../assets/img/hourglass.gif";
import { MachineMode } from "../../../../utils/constants";

const WalletConnect = (props: any) => {
  const {
    address,
    setAddress,
    currentMode,
    setCurrentMode,
    setMachineConfig,
    ducks,
    setDucks,
  } = useMachineStore();
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<string | JSX.Element>("");

  const onConnectWallet = async () => {
    ref.current?.classList.add('animate-blink');      
    const { address, status } = await connectWallet();    
    setAddress(address);
    setStatus(status);
    ref.current?.classList.remove('animate-blink');      
  };

  const getWalletConnected = async () => {
    const { address, status } = await getCurrentWalletConnected();
    setAddress(address);
    setStatus(status);
  };

  useEffect(() => {
    getWalletConnected();
  }, []);

  useEffect(() => {
    if (address) {
      (async () => {
        setCurrentMode(MachineMode.Syncing);
        const machineConfig = await fetchMachineConfig();
        setMachineConfig(machineConfig);
        const newDucks = await fetchDucks(ducks);
        setDucks(newDucks);
        setCurrentMode(MachineMode.Shopping);
      })();
    } else {
      setCurrentMode(MachineMode.Off);
    }
  }, [address]);

  return (
    <div className={`inner-shadow WalletConnect scanline`}>
      <div
        className={`
            text-white                                 
            flex flex-col space-y-1
            text-sm
            mb-2
          `}
      >
        {currentMode === MachineMode.Syncing && (
          <div
            className={`
            btn-connect 
            text-white hover:text-black hover:bg-white
            px-4 text-lg
          `}
          >
            <span className="ml-2">Syncing Duck Data</span>
            <div className="inline-block w-6 h-6 pt-1">
              <img src={hourglass} alt="Hourglass" />
            </div>
          </div>
        )}
        {currentMode === MachineMode.Off && (
          <div
            className={`
              btn-connect 
              hover:bg-white hover:text-black
              px-4 text-lg
              flex justify-center
              space-x-2              
            `}
            ref={ref}
            onClick={onConnectWallet}
          >
            <div className="animate-pokeRight">{">"}</div>
            <div>Connect Wallet</div>
            <div className="animate-pokeLeft">{"<"}</div>
          </div>
        )}
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
