import { useState, useEffect } from "react";
import "./WalletConnect.scss";
import { Html } from "@react-three/drei";
import {
  connectWallet,
  getCurrentWalletConnected,
  fetchDuckMintedEvent,
} from "../../utils/interact";
import useMachineStore from "../../store";

const WalletConnect = (props: any) => {
  const [status, setStatus] = useState<any>("Please connect your wallet.");
  const address = useMachineStore((state) => state.address);
  const setAddress = useMachineStore((state) => state.setAddress);
  const syncing = useMachineStore((state) => state.syncing);
  const setSyncing = useMachineStore((state) => state.setSyncing);
  const duckData = useMachineStore((state) => state.duckData);
  const setDuckData = useMachineStore((state) => state.setDuckData);

  useEffect(() => {
    const getWalletConnected = async () => {
      const { address, status } = await getCurrentWalletConnected();
      setAddress(address);
      setStatus(status);
    };
    getWalletConnected();
    addWalletListener();
  }, []);

  useEffect(() => {
    const fetchDucks = async () => {
      setSyncing(true);
      const res = await fetchDuckMintedEvent(duckData);
      setDuckData(res);
      setSyncing(false);
    };
    if (address) fetchDucks();
  }, [address, setSyncing]);

  const addWalletListener = () => {
    if ((window as any).ethereum) {
      (window as any).ethereum.on("accountsChanged", (accounts: any) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setAddress("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
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
      );
    }
  };

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
              Connect Wallet
            </div>
          </>
        )}
      </div>
    </Html>
  );
};

export default WalletConnect;
