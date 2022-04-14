import { useState } from "react";
import { a, useSpring, easings } from "@react-spring/three";
import useMachineStore from "../../../store";
import { MachineMode, minViewLength } from "../../../utils/constants";
import { useLoader, useThree } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Screen from "./Screen";

let globalRoundCount = 0;
let screenIsRotating = false;

export const MainScreen = () => {
  const { viewport } = useThree();  
  const min = viewport.width;  
  const [screenInverted, setScreenInverted] = useState(false);
  const gltfDisk = useLoader(GLTFLoader, "assets/models/DuckDisk.glb");  
  
  const {     
    switchModes,
    currentMode,
    changeChannel,
    setCurrentTozziDuckId, 
    setCurrentCustomDuckId,    
    processing,
    showTxStatus,
  } = useMachineStore();;
    
  const [spring, setSpring] = useSpring(() => ({
    rotation: [0, 0, 0],
    position: [0, 0, 0],
    config: {
      duration: 2500,      
      bounce: 2,                  
      easing: easings.easeInOutElastic,
    },
    onRest: () => {
      screenIsRotating = false;      
    },    
  }));

  const handleModeSwitch = () => {    
    if ([MachineMode.Off, MachineMode.Syncing].includes(currentMode)) return;
    if (screenIsRotating || processing || showTxStatus) return;
    screenIsRotating = true;    
    setTimeout(() => {changeChannel(1000)}, 300);
    setSpring({ rotation: [Math.PI * ++globalRoundCount, 0, 0] });
    setTimeout(() => {
      switchModes();
      setScreenInverted(!screenInverted);      
    }, 1200);    
  };

  return (
    <a.group
      {...(spring as any)}
      onClick={handleModeSwitch}
      scale={[min / minViewLength, min / minViewLength, min / minViewLength]}
      position={[0.093 * min, -0.068 * min, 0]}      
    >
      <group
        scale={[0.65, 0.65, 0.65]}
        rotation={[0, Math.PI / 2, Math.PI / 2]}
        position={[0, 0, 0]}
      >
        <primitive object={gltfDisk.scene} scale={[0.25, 0.6, 0.6]} rotation={[0, 0, Math.PI / 2]} />        
        <Screen screenInverted={screenInverted} />
      </group>
    </a.group>
  );
};
