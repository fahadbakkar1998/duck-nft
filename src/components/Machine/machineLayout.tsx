import img from "../../../src/assets/img/duck-base-holepunch.png";
import { useLoader, useThree } from "react-three-fiber";
import * as THREE from "three";
import { a, useSpring, config } from "@react-spring/three";
import { DuckCylinder } from "../Cylinder/Cylinder";
import { useState } from "react";
import { filterProps } from "framer-motion";
import { aspectRatio } from "../../utils/constants";
import AltScreen from "./AltScreen"

export const MachineLayout = () => {
  const { viewport } = useThree();
  const texture = useLoader(THREE.TextureLoader, img);

  return (
    <group>
      <mesh position={[0.0, 0.0, -2.0]}>
        <planeBufferGeometry
          attach="geometry"
          args={[viewport.width, (viewport.width * 1) / aspectRatio]}
        />
        <meshBasicMaterial attach="material" map={texture} toneMapped={false} />
      </mesh>
      <DuckCylinder />
      <AltScreen />
    </group>
  );
};
