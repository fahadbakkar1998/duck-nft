import { useState, useEffect } from "react";
import "./WalletConnect.scss";
import { Html } from "@react-three/drei";
import { connectWallet, getCurrentWalletConnected } from "../../utils/interact";
import useMachineStore from "../../store";

const WalletConnect = (props: any) => {
  const [status, setStatus] = useState<any>("Please connect your wallet.");
  const setAddress = useMachineStore((state) => state.setAddress);

  useEffect(() => {
    const getWalletConnected = async () => {
      const { address, status } = await getCurrentWalletConnected();
      setAddress(address);
      setStatus(status);
    };
    getWalletConnected();
    addWalletListener();
  }, []);

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
      </div>
    </Html>
  );
};

export default WalletConnect;
