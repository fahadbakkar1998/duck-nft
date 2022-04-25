import { MainScreen } from "./MainScreen/ScreenMount";
import AltScreen from "./AltScreen";
import BurnModal from "../BurnModal";
import useMachineStore from "../../store";
import ColorPicker from "./MainScreen/CustomizationMode/ColorPicker";
import { MachineMode } from "../../utils/constants";
import WaveForm from "./WaveForm";
import StatusPanel from "./MainScreen/BrowsingMode/StatusPanel";

export const MachineLayout = () => {
  const { openBurnModal, setOpenBurnModal, currentMode } = useMachineStore(
    (state) => state
  );

  return (
    <group>
      <AltScreen />
      <MainScreen />
      {currentMode === MachineMode.Customization ? (
        <ColorPicker />
      ) : (
        <>
          <WaveForm />
          <StatusPanel />
        </>
      )}
      {/* <BurnModal
        openModal={openBurnModal}
        onCloseModal={() => { setOpenBurnModal(false)}}
      /> */}
    </group>
  );
};
