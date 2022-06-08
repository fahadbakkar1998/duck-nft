import { FC } from 'react';
import { useThree } from 'react-three-fiber';
import Screen from '../common/Screen';
import useMachineStore from '../../../store';
import { MachineMode, minViewLength } from '../../../utils/constants';
import BrowsingMode from './BrowsingMode';
import CustomMode from './Custom';
import AdminMode from './Admin';
import './index.scss';
import NotConnected from './NotConnected';
import AltButton from './AltButton';
import StatusLights from './StatusLights';
import MessageModal from './MessageModal';
import ShadowLayer from '../../common/ShadowLayer';
import Static from './Static';

const AltScreen: FC = () => {
  const { currentMode, altIsStatic, altMessage, setAltMessage } = useMachineStore();
  const { viewport } = useThree();
  const min = viewport.width;

  return (
    <Screen
      scale={[
        (0.165 * min) / minViewLength,
        (0.165 * min) / minViewLength,
        (0.165 * min) / minViewLength,
      ]}
      position={[-0.225 * min, -0.031 * min, 0]}
      rotation={[0.0, 0.0, 0.0]}
      transform
    >
      <div className="relative">
        <StatusLights />
        <div
          className={`
            border-[#348476] border 
            w-[336px] h-[324px] relative rounded-lg  z-0
            bg-[rgb(8,8,8)] text-white overflow-hidden
            scanline
          `}
        >
          <ShadowLayer />
          {altIsStatic && <Static /> }
          { [MachineMode.Off, MachineMode.Syncing].includes(currentMode) && <NotConnected /> }
          {currentMode === MachineMode.Shopping && <BrowsingMode />}
          {currentMode === MachineMode.Customization && <CustomMode />}
          {currentMode === MachineMode.Admin && <AdminMode />}
          <MessageModal
            open={!!altMessage.length}
            message={altMessage}
            onClose={() => setAltMessage('')}
          />
        </div>
        <AltButton />
      </div>
    </Screen>
  );
};

export default AltScreen;
