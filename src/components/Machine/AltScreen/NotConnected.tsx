import { useEffect, useState, useRef, FC } from 'react';
import img from '../../../assets/img/ducks/crypto_duck_1.svg';
import useMachineStore from "../../../store";
import {
  connectWallet,
  getCurrentWalletConnected,
  fetchMachineData,
  fetchTozziDuck,
  fetchCustomDuck,
} from "../../../utils/interact";
import MessageModal from './MessageModal';

const NotConnected= () => {

  const [duckIndex, setDuckIndex] = useState(1);
  const [flipper, setFlipper] = useState(true);
  const setAddress = useMachineStore((state) => state.setAddress);
  const currentMode = useMachineStore((state) => state.currentMode);
  const [status, setStatus] = useState<any>("Please connect your wallet.");
  const [modalOpen, setModalOpen] = useState(true);
  
  const getWalletConnected = async () => {
    const { address, status } = await getCurrentWalletConnected();
    setAddress(address);
    setStatus(status);
  };

  useEffect(() => {
    setDuckIndex(Math.ceil(Math.random()*200));
    const hitFlipper = setTimeout(() => setFlipper(!flipper), 8000);  
  },[flipper])

  return (
    <div       
      className={`
        border-[#348476] border mb-11 
         w-[336px] h-[324px] 
        overflow-hidden relative rounded-lg mr-1 z-0

      `}    
    >            
      <MessageModal 
        open={modalOpen}
        message='Connect your wallet to get started.' 
        onClose={() => setModalOpen(false)} 
      /> 
      {/* <div className={`absolute pointer-events-none h-full w-full inner-shadow  rounded-lg opacity-70`} /> */}
      <div className='z-0'>                  
        <img          
          style={{ width: '100%' }}
          className="Shopping-img z-0 animate-fade "
          alt={""}
          src={require(`../../../assets/img/ducks/crypto_duck_${duckIndex}.svg`)}          
        />         
      </div>
    </div>
  );
}



export default NotConnected;