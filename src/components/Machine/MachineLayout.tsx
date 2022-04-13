import { MainScreen } from "../MainScreen.tsx/ScreenMount";
import AltScreen from "./AltScreen";
import BurnModal from "../BurnModal";
import useMachineStore from "../../store";

export const MachineLayout = () => {

  const openBurnModal = useMachineStore((state) => state.openBurnModal);
  const setOpenBurnModal = useMachineStore((state) => state.setOpenBurnModal);

  return (
    <group>      
      <AltScreen />
      <MainScreen />      
      <BurnModal
        openModal={openBurnModal}
        onCloseModal={() => { setOpenBurnModal(false)}}
      />
    </group>
  );
};
