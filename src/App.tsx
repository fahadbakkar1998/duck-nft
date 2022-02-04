import * as THREE from "three";
import React, { Suspense, useEffect, useRef, useState }  from 'react';
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { Stats, OrbitControls } from "@react-three/drei";
import './App.css';
import { SmallBox, Wall, Box, Ball, Ground } from "./scene";
import Viewer from './components/Viewer';
import { MachineLayout } from "./components/Machine/machineLayout";
import Screen from './components/Screen/Screen';
import NumPad from './components/Pad/Pad';

function App() {
  return (
    <div className="App">
      {/* <Canvas camera={{fov: 18, position: [0, 0, 15]}} shadows>
        <Suspense fallback={null}>
          <OrbitControls/>
              <MachineLayout />
        </Suspense>
      </Canvas> */}
      <Screen />
      <NumPad />
    </div>
  );
}

export default App;
