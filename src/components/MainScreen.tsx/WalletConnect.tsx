  import { useState, useEffect } from "react";
import "./WalletConnect.scss";
import { Html } from "@react-three/drei";
import {
  connectWallet,
  getCurrentWalletConnected,
  fetchMachineData,
  fetchTozziDuck,
  fetchCustomDuck,
} from "../../utils/interact";
import { getFloat, getInt } from "../../utils/common";
import useMachineStore from "../../store";
import hourglass from  '../../assets/img/hourglass.gif';

const WalletConnect = (props: any) => {
  const [status, setStatus] = useState<any>("Please connect your wallet.");
  const address = useMachineStore((state) => state.address);
  const setAddress = useMachineStore((state) => state.setAddress);
  const syncing = useMachineStore((state) => state.syncing);
  const setSyncing = useMachineStore((state) => state.setSyncing);
  const setMachineSetting = useMachineStore((state) => state.setMachineSetting);
  const tozziDuckData = useMachineStore((state) => state.tozziDuckData);
  const setTozziDuckData = useMachineStore((state) => state.setTozziDuckData);
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
  }

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
    const fetchDucks = async () => {
      setSyncing(true);
      const machineSetting = await fetchMachineData();
      // console.log("fetch machine setting", machineSetting);
      setMachineSetting({
        tozziDuckPrice: getFloat(machineSetting.tozziDuckPrice),
        customDuckPrice: getFloat(machineSetting.customDuckPrice),
        maxCustomDucks: getFloat(machineSetting.maxCustomDucks),
        balance: getFloat(machineSetting.balance),
        tozziDucksEnabled: machineSetting.tozziDucksEnabled,
        customDucksEnabled: machineSetting.customDucksEnabled,
        burnWindow: getInt(machineSetting.burnWindow),
      });
      setTozziDuckData(await fetchTozziDuck(tozziDuckData));
      setCustomDuckData(await fetchCustomDuck());
      setSyncing(false);
    };
    if (address) fetchDucks();
  }, [address]);

  return (
    <Html
      style={{ pointerEvents: "auto" }}
      distanceFactor={2.4}
      position={props.isFront ? [0.0, 0.1, 0.0] : [0.0, -0.1, 0.0]}
      rotation={
        props.isFront
          ? [Math.PI / 2, Math.PI, Math.PI / 2]
          : [Math.PI / 2, -Math.PI * 2, Math.PI / 2]
      }
      transform
      occlude
    >
      <div className={`inner-shadow WalletConnect ${!props.isShow && "hidden"}`}>
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
            `} onClick={handleClick}
          >
            { true && (
              <>                
                <span className="ml-2">Syncing Duck Data</span>
                <div className="inline-block h-6 w-6 pt-1">
                  <img  src={hourglass} alt="Hourglass"/>
                </div>
              </>
            )}
            { false && (
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
    </Html>
  );
};

export default WalletConnect;
