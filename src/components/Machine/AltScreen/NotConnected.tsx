import { useEffect, useState, useRef } from "react";
import img from "../../../assets/img/ducks/crypto_duck_1.svg";
import useMachineStore from "../../../store";
import {
  connectWallet,
  getCurrentWalletConnected,
  fetchMachineData,
  fetchTozziDuck,
  fetchCustomDuck,
} from "../../../utils/interact";

const NotConnected = () => {
  const [duckIndex, setDuckIndex] = useState(1);
  const [flipper, setFlipper] = useState(true);
  const setAddress = useMachineStore((state) => state.setAddress);
  const [status, setStatus] = useState<any>("Please connect your wallet.");

  const getWalletConnected = async () => {
    const { address, status } = await getCurrentWalletConnected();
    setAddress(address);
    setStatus(status);
  };

  useEffect(() => {
    let isMounted = true;
    setDuckIndex(Math.ceil(Math.random() * 200));
    setTimeout(() => isMounted && setFlipper(!flipper), 8000);
    return () => {
      isMounted = false;
    };
  }, [flipper]);

  return (
    <div className="border-[#348476] border  mb-11  bg-red-200 w-[336px] h-[324px] overflow-hidden relative rounded-lg mr-1">
      <div
        className={`absolute  h-full w-full inner-shadow z-20 rounded-lg opacity-70`}
      />

      <div className="z-0 scanlines">
        <div
          className={`          
          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2          
          black-screen
          pixel-font text-white  z-10 p-10 border-2 border-white
          w-5/6 h-5/6 text-xl
          flex flex-col justify-between items-start
        `}
        >
          <div>{(status as string).toUpperCase()}</div>
          <div className="bg-white  text-black px-4 cursor-pointer z-30 hover:bg-red-300">
            Close
          </div>
        </div>
        <img
          style={{ width: "100%" }}
          className="Shopping-img z-0 animate-fade "
          alt={""}
          src={require(`../../../assets/img/ducks/crypto_duck_${duckIndex}.svg`)}
        />
      </div>
    </div>
  );
};

export default NotConnected;
