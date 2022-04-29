
import useMachineStore from '../../store';
import { MachineMode } from '../../utils/constants';
import { FC } from 'react';
import { SmallCircleButton } from './CircleButton';
import nextIcon from '../../assets/img/icons/next.svg';
import prevIcon from '../../assets/img/icons/prev.svg';

interface ModeSwitcherProps {
  switchModes: () => void;
}

const getModeName = (mode: MachineMode): string => {
  switch(mode) {          
    case MachineMode.Shopping:
      return 'browsing mode';
    case MachineMode.Customization:
      return 'custom duck mode'
    case MachineMode.Admin:
        return 'admin mode'
  }
  return '----';
}

const ModeSwitcher: FC<ModeSwitcherProps> = ({ switchModes }) => {
  const { currentMode } = useMachineStore();
  return (
    <div className="relative select-none flex justify-center w-full">
      <div className="absolute flex justify-center items-center w-3/5 space-x-2">        
        <SmallCircleButton image={prevIcon} onClick={switchModes}/>
        <div className="graph-bg  rounded flex-1 text-center px-2 lcd-font text-opacity-80 border inner-shadow border-gray-600">
          {getModeName(currentMode)}
        </div>
        <SmallCircleButton image={nextIcon} onClick={switchModes} />
      </div>
    </div>
  );
};

export default ModeSwitcher;
