import { MainScreen } from "../MainScreen.tsx/ScreenMount";
import AltScreen from "./AltScreen";
import BurnModal from "../BurnModal";
import useMachineStore from "../../store";
import ColorPicker from "../DrawingTool/ColorPicker";
import { MachineMode } from "../../utils/constants";

export const MachineLayout = () => {

  const { openBurnModal, setOpenBurnModal, currentMode} = useMachineStore((state) => state);  

  return (
    <group>      
      <AltScreen />
      <MainScreen />     
      { currentMode === MachineMode.Customization && <ColorPicker /> }       
      {/* <BurnModal
        openModal={openBurnModal}
        onCloseModal={() => { setOpenBurnModal(false)}}
      /> */}
    </group>
  );
};
