import * as THREE from "three";
import React, { Suspense, useEffect, useRef, useState }  from 'react';
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { Stats, OrbitControls } from "@react-three/drei";
import './App.css';
import { SmallBox, Wall, Box, Ball, Ground } from "./scene";
import Viewer from './components/Viewer';
import { MachineLayout } from "./components/Machine/machineLayout";


function App() {
  return (
    <div className="App">
      <Canvas orthographic camera={{ zoom: 135, position: [0, 0, 100] }} shadows>
        <Suspense fallback={null}>
          {/* <OrbitControls/> */}
              <MachineLayout />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
