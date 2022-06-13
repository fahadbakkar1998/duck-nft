import { useEffect, useRef } from 'react';
import { useEthers } from '@usedapp/core';
import './index.scss';
import useMachineStore from '../../../../store';
import { MachineMode } from '../../../../utils/constants';
import { DuckLogo } from '../../../common/SvgIcon';

const WalletConnect = () => {
  const { currentMode, setCurrentMode, setAltMessage, setIsSwitchingModes, isSwitchingModes } = useMachineStore();
  const ref = useRef<HTMLDivElement>(null);
  const { activateBrowserWallet, account, chainId } = useEthers();

  const handleConnectWallet = async () => {
    if (chainId !== parseInt(process.env.REACT_APP_CHAIN_ID!)) {
      setAltMessage('Please connect to Mainnet Ethereum!');
      return;
    }
    ref.current?.classList.add('animate-blink');
    setTimeout(() => { ref.current?.classList.remove('animate-blink'); }, 300);
    setAltMessage('');
    activateBrowserWallet();
  };

  useEffect(() => {
    if (account) {
      setIsSwitchingModes(true);
      setTimeout(() => {
        setIsSwitchingModes(false);
        setCurrentMode(MachineMode.Shopping);
      }, 200);
    } else {
      setCurrentMode(MachineMode.Off);
    }
  }, [account]);

  return (
    <div className="inner-shadow WalletConnect scanline">
      { isSwitchingModes && (
        <div className="absolute top-24  scale-[1.8]  opacity-100 overflow-hidden">
          <video
            id="alt-static"
            playsInline
            autoPlay
            muted
            loop
            src="/assets/video/static.mp4"
          />
        </div>
      )}
      { !isSwitchingModes && (
        <>
          <DuckLogo className="w-full" wrapperClassName="w-full" />
          <div className="text-white flex flex-col space-y-1 text-sm mb-2">
            {currentMode === MachineMode.Off && (
              <div
                className="btn-connect hover:bg-white hover:text-black px-4 text-lg flex justify-center space-x-2"
                ref={ref}
                onClick={handleConnectWallet}
              >
                <div className="animate-pokeRight">{'>'}</div>
                <div>Connect Wallet</div>
                <div className="animate-pokeLeft">{'<'}</div>
              </div>
            )}
            <div className="flex justify-center opacity-75">
              <div className="mr-2">TM &amp; Ⓒ</div>
              <div>CHAIN/SAW CORP, 2022</div>
            </div>
            <div className="opacity-75">LICENSED BY JIM TOZZI</div>
            <div className="opacity-75">FOR USE ON ETHEREUM BLOCKCHAIN</div>
          </div>
        </>
      )}
    </div>
  );
};

export default WalletConnect;
