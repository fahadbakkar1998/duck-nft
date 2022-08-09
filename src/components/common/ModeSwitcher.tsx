import { FC } from 'react';
import useSound from 'use-sound';
import useMachineStore from '../../store';
import { MachineMode } from '../../utils/constants';
import { SmallCircleButton } from './CircleButton';
import nextIcon from '../../assets/img/icons/next.svg';
import prevIcon from '../../assets/img/icons/prev.svg';
import ShimmerLayer from './ShimmerLayer';
// @ts-ignore
import keyPress from '../../assets/audio/keypress.mp3';

interface ModeSwitcherProps {
  switchModes: (direction: string) => void;
}

const getModeName = (mode: MachineMode): string => {
  switch (mode) {
    case MachineMode.Shopping:
      return 'duck browser';
    case MachineMode.Customization:
      return 'duck customizer';
    case MachineMode.Admin:
      return 'admin mode';
    default: return '----';
  }
};

const ModeSwitcher: FC<ModeSwitcherProps> = ({ switchModes }) => {
  const { currentMode, isLocked } = useMachineStore();
  const [playKeyPress] = useSound(keyPress);

  const handleNext = () => {
    if (isLocked) return;
    playKeyPress();
    switchModes('next');
  };

  const handlePrev = () => {
    if (isLocked) return;
    playKeyPress();
    switchModes('prev');
  };

  return (
    <div className="bottom">
      <div className="relative select-none flex justify-center w-full">
        <div className="absolute flex justify-center items-center w-3/5 space-x-2">
          <SmallCircleButton image={prevIcon} onClick={handlePrev} />
          <div className="graph-bg  rounded flex-1 text-center px-2 lcd-font text-opacity-80 border inner-shadow border-gray-600 relative">
            <ShimmerLayer className="left-0 rounded" />
            {getModeName(currentMode)}
          </div>
          <SmallCircleButton image={nextIcon} onClick={handleNext} />
        </div>
      </div>
    </div>
  );
};

export default ModeSwitcher;
