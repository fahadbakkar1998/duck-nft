import * as THREE from "three";
import React, { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { Stats, OrbitControls } from "@react-three/drei";
import "./App.scss";
import { SmallBox, Wall, Box, Ball, Ground } from "./scene";
import Viewer from "./components/Viewer";
import { MachineLayout } from "./components/Machine/machineLayout";
// import Screen from "./components/Screen/Screen";
import NumPad from "./components/Pad/Pad";
import DrawingTool from "./components/DrawingTool/DrawingTool";
import useMachineStore from "./store";
import CardImageSection from "./components/CardImageSection/CardImageSection";
import Screen from "./components/Screen/Screen";
import AdminMain from "./components/AdminMain/AdminMain";

function App() {
  const currentMachineMode = useMachineStore((state) => state.currentMode);
  const setCurrentMachineMode = useMachineStore(
    (state) => state.setCurrentMode
  );

  const cam = useRef()
  const [mode, setMode] = useState(1);

  const changeMode = () => {
    const nextMode = currentMachineMode === 2 ? 0 : currentMachineMode + 1;
    setMode(nextMode);
    setCurrentMachineMode(nextMode);
    console.log(currentMachineMode)
  };

  return (
    <div className="App">
      <Canvas orthographic camera={{ zoom: 115, position: [0, 0, 100] }} shadows>
          <Suspense fallback={null}>
            <OrbitControls/>
            <MachineLayout />
          </Suspense>
        </Canvas>
    </div>
  );
}

export default App;
