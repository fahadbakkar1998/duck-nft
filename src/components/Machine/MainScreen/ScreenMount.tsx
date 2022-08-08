/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-plusplus */
import { useState, useRef, useEffect } from 'react';
import useSound from 'use-sound';
import { a, useSpring, easings } from '@react-spring/three';
import { useLoader, useThree } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import useMachineStore from '../../../store';
import { MachineMode, minViewLength } from '../../../utils/constants';
import Screen from './index';
// @ts-ignore
import keyPress from '../../../assets/audio/keypress.mp3';
// @ts-ignore
import woosh from '../../../assets/audio/woosh.mp3';

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
  const [playWoosh] = useSound(woosh, { volume: 0.3, playbackRate: 1.5 });

  const {
    switchModes,
    currentMode,
    changeChannel,
    processing,
    showTxStatus,
    setIsSwitchingModes,
    isLocked,
    newDuck,
    setNewDuck,
    setCurrentDuckId,
  } = useMachineStore();

  const [spring, setSpring] = useSpring(() => ({
    rotation: [0, 0, 0],
    position: [0, 0, 0],
    config: {
      duration: 2300,
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
      playWoosh();
    }, 825);
    setTimeout(() => {
      setScreenIsRotating(false);
    }, 1500);
    setSpring({ rotation: [Math.PI * ++globalRoundCount, 0, 0] });
    setIsSwitchingModes(true);
    setTimeout(() => {
      switchModes(direction);
      setScreenInverted(!screenInverted);
    }, 1100);
  };

  useEffect(() => {
    if (newDuck !== undefined) {
      handleModeSwitch('prev');
      setCurrentDuckId(newDuck);
      setNewDuck(undefined);
    }
  }, [newDuck]);

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
