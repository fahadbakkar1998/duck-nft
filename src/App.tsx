import * as THREE from "three";
import React, { useEffect, useRef, useState }  from 'react';
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { Stats, OrbitControls } from "@react-three/drei";
import './App.css';
import { SmallBox, Wall, Box, Ball, Ground } from "./scene";
import Viewer from './components/Viewer';



function App() {
  return (
    <div className="App">
        <Viewer/>      
    </div>
  );
}

export default App;
