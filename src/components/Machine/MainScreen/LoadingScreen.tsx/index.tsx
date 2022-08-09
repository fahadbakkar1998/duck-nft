import { FC, useEffect, useRef } from 'react';
import useSound from 'use-sound';
import './index.scss';
import useMachineStore from '../../../../store';
import { MachineMode } from '../../../../utils/constants';
import { DuckLogo } from '../../../common/SvgIcon';
import { useMachineState } from '../../../../state/hooks';
// @ts-ignore
import selectSound from '../../../../assets/audio/select.wav';
// @ts-ignore
import successSound from '../../../../assets/audio/success.mp3';

interface LoadingScreenProps {
  switchModes: (direction: string) => void;
}

const LoadingScreen: FC<LoadingScreenProps> = ({ switchModes }) => {
  const { currentMode } = useMachineStore();
  const ref = useRef<HTMLDivElement>(null);
  const { isLoading } = useMachineState();
  const [playSelect] = useSound(selectSound);
  const [playSuccess] = useSound(successSound);

  const handleConnectWallet = async () => {
    if (isLoading) return;
    playSelect();
    ref.current?.classList.add('animate-blink');
    setTimeout(() => { ref.current?.classList.remove('animate-blink'); }, 300);
    switchModes('next');
  };

  useEffect(() => {
    if (!isLoading) {
      (new Audio(successSound)).play();
    }
  }, [isLoading]);

  return (
    <div className="inner-shadow LoadingScreen">
      <DuckLogo className="w-full" wrapperClassName="w-full" />
      <div className="text-white flex flex-col space-y-1 text-sm mb-2">
        {currentMode === MachineMode.Off && (
          <div
            className="btn-connect hover:bg-white hover:text-black px-4 text-lg flex justify-center space-x-2"
            ref={ref}
            onClick={handleConnectWallet}
          >
            <div className="animate-pokeRight">{'>'}</div>
            <div>{ isLoading ? 'LOADING DUCKS' : 'CLICK TO START'}</div>
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
    </div>
  );
};

export default LoadingScreen;
