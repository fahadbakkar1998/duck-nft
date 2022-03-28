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
      <div className={`WalletConnect ${!props.isShow && "hidden"}`}>
        {syncing ? (
          <div>Syncing</div>
        ) : (
          <>
            <div className="description">{status}</div>
            <div
              className="btn-connect"
              onClick={async () => {
                const { address, status } = await connectWallet();
                setAddress(address);
                setStatus(status);
              }}
            >
              Connect Wallet To Start
            </div>
          </>
        )}
      </div>
    </Html>
  );
};

export default WalletConnect;
