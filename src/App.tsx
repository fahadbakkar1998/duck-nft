import * as THREE from "three";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { Stats, OrbitControls } from "@react-three/drei";
import "./App.css";
import { SmallBox, Wall, Box, Ball, Ground } from "./scene";
import Viewer from "./components/Viewer";
import { MachineLayout } from "./components/Machine/machineLayout";
import Screen from "./components/Screen/Screen";
import NumPad from "./components/Pad/Pad";
import useMachineStore from "./store";

function App() {
  const currentMachineMode = useMachineStore((state) => state.currentMode);
  const setCurrentMachineMode = useMachineStore(
    (state) => state.setCurrentMode
  );
  let mode = 1;
  const changeMode = () => {
    mode == 4 ? (mode = 1) : (mode = mode);
    setCurrentMachineMode(mode);
    mode++;
  };
  return (
    <div className="App">
      <button className="changeModeBtn" onClick={() => changeMode()}>
        Change Mode
      </button>
      {currentMachineMode === 1 && (
        <Canvas camera={{ fov: 20, position: [0, 0, 15] }} shadows>
          <Suspense fallback={null}>
            <OrbitControls />
            <MachineLayout />
          </Suspense>
        </Canvas>
      )}
      {currentMachineMode === 2 && (
        <>
          <Screen />
          <NumPad />
        </>
      )}
    </div>
  );
}

export default App;
