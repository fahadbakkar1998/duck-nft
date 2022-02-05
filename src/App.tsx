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
import DrawingTool from "./components/DrawingTool/DrawingTool";
import useMachineStore from "./store";

function App() {
  const currentMachineMode = useMachineStore((state) => state.currentMode);
  const setCurrentMachineMode = useMachineStore(
    (state) => state.setCurrentMode
  );
  // let mode = 1;
  const [mode, setMode] = useState(1);

  const changeMode = () => {
    const nextMode = currentMachineMode === 2 ? 0 : currentMachineMode + 1;
    setMode(nextMode);
    setCurrentMachineMode(nextMode);
    console.log(currentMachineMode)
  };

  return (
    <div className="App">
      <button className="changeModeBtn" onClick={() => changeMode()}>
        Change Mode
      </button>
      {currentMachineMode === 0 && (
        <Canvas camera={{ fov: 20, position: [0, 0, 15] }} shadows>
          <Suspense fallback={null}>
            {/* <OrbitControls /> */}
            <MachineLayout />
          </Suspense>
        </Canvas>
      )}
      {currentMachineMode === 1 && (
        <>
          <Screen />
          {/* <NumPad /> */}
        </>
      )}
      {currentMachineMode === 2 && (
        <>
          <DrawingTool />
        </>
      )}
    </div>
  );
}

export default App;
