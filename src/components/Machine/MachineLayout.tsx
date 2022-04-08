import img from "../../../src/assets/img/duck-base-holepunch.png";
import { useLoader, useThree } from "react-three-fiber";
import * as THREE from "three";
import { a, useSpring, config } from "@react-spring/three";
import { DuckCylinder } from "../Cylinder/Cylinder";
import { filterProps } from "framer-motion";
import { aspectRatio } from "../../utils/constants";
import AltScreen from "./AltScreen";
import ColorPicker from "../DrawingTool/ColorPicker";
import BurnModal from "../BurnModal";
import useMachineStore from "../../store";

export const MachineLayout = () => {
  const { viewport } = useThree();
  // const min = Math.min(viewport.width, viewport.height);
const min = viewport.width;
  const texture = useLoader(THREE.TextureLoader, img);
  const openBurnModal = useMachineStore((state) => state.openBurnModal);
  const setOpenBurnModal = useMachineStore((state) => state.setOpenBurnModal);

  return (
    <group>
      {/* <mesh position={[0.0, 0.0, -2.0]}>
        <planeBufferGeometry
          attach="geometry"
          args={[min, min * aspectRatio]}
        />
        <meshBasicMaterial attach="material" map={texture} toneMapped={false} />
      </mesh> */}
      <DuckCylinder />
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
