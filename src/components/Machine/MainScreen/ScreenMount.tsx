/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-plusplus */
import { useState, useRef } from 'react';
import useSound from 'use-sound';
import { a, useSpring, easings } from '@react-spring/three';
import { useLoader, useThree } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import useMachineStore from '../../../store';
import { MachineMode, minViewLength } from '../../../utils/constants';
import Screen from './index';
// @ts-ignore
import keyPress from '../../../assets/audio/keypress.mp3';

let globalRoundCount = 0;
// let screenIsRotating = false;

export const MainScreen = () => {
  const { viewport } = useThree();
  const min = viewport.width;
  const [screenInverted, setScreenInverted] = useState(false);
  const [screenIsRotating, setScreenIsRotating] = useState(false);
  const gltfDisk = useLoader(GLTFLoader, 'assets/models/DuckDisk.glb');
  const modelRef = useRef();
  const [playKeyPress] = useSound(keyPress);

  const {
    switchModes,
    currentMode,
    changeChannel,
    processing,
    showTxStatus,
    setIsSwitchingModes,
    isLocked,
  } = useMachineStore();

  const [spring, setSpring] = useSpring(() => ({
    rotation: [0, 0, 0],
    position: [0, 0, 0],
    config: {
      duration: 2500,
      easing: easings.easeInOutElastic,
    },
  }));

  const handleModeSwitch = (direction: string) => {
    if (isLocked) return;
    if (currentMode === MachineMode.Off) return;
    playKeyPress();
    if (screenIsRotating || processing || showTxStatus) return;
    setScreenIsRotating(true);
    setTimeout(() => {
      changeChannel(1000);
    }, 300);
    setTimeout(() => {
      setScreenIsRotating(false);
    }, 1800);

    setSpring({ rotation: [Math.PI * ++globalRoundCount, 0, 0] });
    setIsSwitchingModes(true);
    setTimeout(() => {
      switchModes(direction);
      setScreenInverted(!screenInverted);
    }, 1200);
  };

  return (
    <a.group
      {...(spring as any)}
      ref={modelRef}
      scale={[min / minViewLength, min / minViewLength, min / minViewLength]}
      position={[0.093 * min, -0.068 * min, 0]}
    >
      <group
        scale={[0.65, 0.65, 0.65]}
        rotation={[0, Math.PI / 2, Math.PI / 2]}
        position={[0, 0, 0]}
      >
        <primitive
          object={gltfDisk.scene}
          scale={[0.25, 0.6, 0.6]}
          rotation={[0, 0, Math.PI / 2]}
        />
        <Screen screenInverted={screenInverted} switchModes={handleModeSwitch} />
      </group>
    </a.group>
  );
};
