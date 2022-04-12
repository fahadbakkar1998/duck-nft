import img from "../../../src/assets/img/duck-base-holepunch.png";
import { useLoader, useThree } from "react-three-fiber";
import * as THREE from "three";
import { FlipScreen } from "../MainScreen.tsx/Cylinder";
import AltScreen from "./AltScreen";
import ColorPicker from "../DrawingTool/ColorPicker";
import BurnModal from "../BurnModal";
import useMachineStore from "../../store";

export const MachineLayout = () => {

  const openBurnModal = useMachineStore((state) => state.openBurnModal);
  const setOpenBurnModal = useMachineStore((state) => state.setOpenBurnModal);

  return (
    <group>
      <FlipScreen />
      <AltScreen />
      <ColorPicker />
      <BurnModal
        openModal={openBurnModal}
        onCloseModal={() => {
          setOpenBurnModal(false);
        }}
      />
    </group>
  );
};
