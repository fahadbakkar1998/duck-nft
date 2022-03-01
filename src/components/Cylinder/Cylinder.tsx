import { Cylinder } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { a, useSpring, easings } from "@react-spring/three";
import DrawingTool from "../DrawingTool";
import useMachineStore from "../../store";
import CardImageSection from "../CardImageSection/CardImageSection";
import AdminMain from "../AdminMain/AdminMain";
import { aspectRatio } from "../../utils/constants";
import { useLoader, useThree } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AxesHelper } from "three";
import WalletConnect from "./WalletConnect";

let globalRoundCount = 0;
let globalRotating = false;

export const DuckCylinder = () => {
  const { viewport } = useThree();
  const [roundCount, setRoundCount] = useState(0);
  const gltfDisk = useLoader(GLTFLoader, "assets/models/DuckDisk.glb");
  const setCurrentMode = useMachineStore((state) => state.setCurrentMode);
  const address = useMachineStore((state) => state.address);

  const [spring, setSpring] = useSpring(() => ({
    rotation: [0, 0, 0],
    position: [0, 0, 0],
    config: {
      duration: 3000,
      easing: easings.easeInOutElastic,
    },
    onRest: () => {
      globalRotating = false;
      setRoundCount(globalRoundCount);
    },
  }));

  const handelOnClick = () => {
    if (globalRotating) return;
    globalRotating = true;
    setSpring({ rotation: [Math.PI * ++globalRoundCount, 0, 0] });
    setCurrentMode(globalRoundCount % 3);
  };

  const restRoundCount = roundCount % 3;
  const isFront = !(roundCount % 2);

  return (
    <a.group
      {...(spring as any)}
      onClick={handelOnClick}
      position={[0, (15 * viewport.width) / 1000, 0]}
    >
      <group
        scale={[
          viewport.width / 6 / aspectRatio,
          viewport.width / 10,
          viewport.width / 11,
        ]}
        rotation={[0, Math.PI / 2, Math.PI / 2]}
        position={[viewport.width / 12, 0, 0.0]}
      >
        <primitive
          object={gltfDisk.scene}
          scale={[0.6, 0.6, 0.6]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <Cylinder args={[1.8, 1.8, 0.1, 50]} rotation={[0, 0, Math.PI / 2]}>
            <meshBasicMaterial attach="material" color="#6C6C6C" />
          </Cylinder>
        </primitive>
        {address && (
          <>
            {(restRoundCount === 0 || restRoundCount === 2) && (
              <CardImageSection
                isFront={restRoundCount === 0 ? isFront : !isFront}
              ></CardImageSection>
            )}
            {(restRoundCount === 1 || restRoundCount === 0) && (
              <DrawingTool
                isFront={restRoundCount === 1 ? isFront : !isFront}
              ></DrawingTool>
            )}
            {(restRoundCount === 2 || restRoundCount === 1) && (
              <AdminMain
                isFront={restRoundCount === 2 ? isFront : !isFront}
              ></AdminMain>
            )}
          </>
        )}
        <WalletConnect isFront={isFront} isShow={!address}></WalletConnect>
      </group>
    </a.group>
  );
};
