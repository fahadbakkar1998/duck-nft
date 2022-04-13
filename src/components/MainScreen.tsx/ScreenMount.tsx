import { useEffect, useRef, useState } from "react";
import { a, useSpring, easings } from "@react-spring/three";
import useMachineStore from "../../store";
import { aspectRatio, minViewLength } from "../../utils/constants";
import { useLoader, useThree } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Screen from "./Screen";

let globalRoundCount = 0;
let globalRotating = false;

export const MainScreen = () => {
  const { viewport } = useThree();  
  const min = viewport.width;
  const [roundCount, setRoundCount] = useState(0);
  const gltfDisk = useLoader(GLTFLoader, "assets/models/DuckDisk.glb");
  const setCurrentMode = useMachineStore((state) => state.setCurrentMode);
  const setCurrentTozziDuckId = useMachineStore(
    (state) => state.setCurrentTozziDuckId
  );
  const setCurrentCustomDuckId = useMachineStore(
    (state) => state.setCurrentCustomDuckId
  );
  const address = useMachineStore((state) => state.address);
  const syncing = useMachineStore((state) => state.syncing);
  const processing = useMachineStore((state) => state.processing);
  const showTxStatus = useMachineStore((state) => state.showTxStatus);

  const [spring, setSpring] = useSpring(() => ({
    rotation: [0, 0, 0],
    position: [0, 0, 0],
    config: {
      duration: 2500,      
      bounce: 2,                  
      easing: easings.easeInOutElastic,
    },
    onRest: () => {
      globalRotating = false;
      setRoundCount(globalRoundCount);
    },
  }));

  const handelOnClick = () => {
    const homeScreen = document.getElementById('home-screen');
    homeScreen?.classList.add('overflow-hidden');
    homeScreen?.classList.remove('overflow-scroll');    
    if (globalRotating || syncing || processing || showTxStatus) return;
    globalRotating = true;
    setSpring({ rotation: [Math.PI * ++globalRoundCount, 0, 0] });
    setCurrentMode(globalRoundCount % 3);
    setCurrentTozziDuckId(-1);
    setCurrentCustomDuckId(-1);    
    setTimeout(() => {
      console.log('unlocked');
      homeScreen?.classList.add('overflow-scroll');
    }, 1500);
  };

  const restRoundCount = roundCount % 3;
  const isFront = !(roundCount % 2);
  
  return (
    <a.group
      {...(spring as any)}
      onClick={handelOnClick}
      scale={[min / minViewLength, min / minViewLength, min / minViewLength]}
      position={[0.093 * min, -0.068 * min, 0]}
    >
      <group
        scale={[0.65, 0.65, 0.65]}
        rotation={[0, Math.PI / 2, Math.PI / 2]}
        position={[0, 0, 0]}
      >
        <primitive object={gltfDisk.scene} scale={[0.25, 0.6, 0.6]} rotation={[0, 0, Math.PI / 2]} />        
        <Screen restRoundCount={restRoundCount} isFront={isFront} />
      </group>
    </a.group>
  );
};
