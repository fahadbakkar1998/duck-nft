import { MainScreen } from './MainScreen/ScreenMount';
import AltScreen from './AltScreen';
import useMachineStore from '../../store';
import ColorPicker from './MainScreen/CustomizationMode/ColorPicker';
import { MachineMode } from '../../utils/constants';
import WaveForm from './WaveForm';
import StatusPanel from './MainScreen/BrowsingMode/StatusPanel';
import Keyboard from './Keyboard';
// eslint-disable-next-line import/no-relative-packages
import { motion, AnimatePresence } from '../../../node_modules/framer-motion/dist/framer-motion';
import Providers from '../../Providers';

const Machine = () => {
  const { currentMode } = useMachineStore();

  return (
    <group>
      <AltScreen />
      <MainScreen />
      <Keyboard />
      {
        currentMode === MachineMode.Customization
          ? (
            <ColorPicker />
          )
          : (
            <>
              <WaveForm />
              <StatusPanel />
            </>
          )
      }
    </group>
  );
};

export default Machine;
