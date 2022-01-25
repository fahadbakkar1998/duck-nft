import * as THREE from "three";
import React, { useEffect, useRef, useState }  from 'react';
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { Stats, OrbitControls } from "@react-three/drei";
import './App.css';
import { SmallBox, Wall, Box, Ball, Ground } from "./scene";
import Viewer from './components/Viewer';

// function DynamicResolution({ min = 0.1, max = 1, step = 0.1 }) {
//   const { gl } = useThree();
//   const orbitRef = useRef();
//   const [active, setActive] = useState(false);

//   useEffect(() => {
//     orbitRef.current.addEventListener("start", () => {
//       setActive(true);
//     });
//     orbitRef.current.addEventListener("end", () => {
//       setActive(false);
//     });
//   }, [orbitRef]);

//   useFrame(() => {
//     if (active) {
//       gl.setPixelRatio(THREE.MathUtils.lerp(gl.getPixelRatio(), min, step));
//     } else {
//       if (gl.getPixelRatio() < max - step) {
//         gl.setPixelRatio(THREE.MathUtils.lerp(gl.getPixelRatio(), max, step));
//       } else if (gl.getPixelRatio() < max) {
//         gl.setPixelRatio(max);
//       }
//     }
//   });

//   return <OrbitControls ref={orbitRef} />;
// }


function App() {
  return (
    <div className="App">
        <Viewer/>      
    </div>
  );
}

export default App;
