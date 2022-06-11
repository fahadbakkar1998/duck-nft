import { MainScreen } from './MainScreen/ScreenMount';
import AltScreen from './AltScreen';
import useMachineStore from '../../store';
import ColorPicker from './MainScreen/CustomizationMode/ColorPicker';
import { MachineMode } from '../../utils/constants';
import WaveForm from './WaveForm';
import StatusPanel from './MainScreen/BrowsingMode/StatusPanel';
import Keyboard from './Keyboard';

const Machine = () => {
  const { currentMode } = useMachineStore(
    (state) => state,
  );

  return (
    <group>
      <AltScreen />
      <MainScreen />
      <Keyboard />
      {
        currentMode === MachineMode.Customization
          ? <ColorPicker />
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
