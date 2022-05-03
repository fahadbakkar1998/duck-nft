import { Suspense, useState } from "react";
import { Canvas } from "react-three-fiber";
import "./App.scss";
import { MachineLayout } from "./components/Machine/index";
// import bgImg from "./assets/img/duck-base-holepunch.png";
// import bgImg from "./assets/img/machine-bg.jpg";
import bgImg from "./assets/img/machine-bg.png";
import { OrbitControls } from "@react-three/drei";
import Mobile from "./components/Mobile/Mobile";
import ToggleSwitch from "./components/Machine/MainScreen/ToggleSwitch";

function App() {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  return isMobile ? (
    <Mobile />
  ) : (
    <div>
    <div className="App flex flex-col">                  
      <div
        className={`
        top-0
        mx-auto
        w-full
        flex justify-center
        absolute z-20 
        testy-font text-[100pt] phat-purple 
        `}
      >
        <div className={`mt-40 z-30 relative mx-auto bg-opacity-20 rounded-full`}>
            Tozzi ducks
          <span className="text-7xl copy-text ">&copy;</span>
        </div>
      </div>
      
      <div className="machine-container relative">
        <div className="flex gap-3 z-50 absolute top-[77.2%] left-[59%] w-[25%] transform -translate-x-1/2 -translate-y-1/2">
          <ToggleSwitch />
          <ToggleSwitch />
          <ToggleSwitch />
          <ToggleSwitch />
          <ToggleSwitch />
          <ToggleSwitch />
          <ToggleSwitch />
          <ToggleSwitch />
        </div>
        <img className="background" src={bgImg} alt=""></img>
        
        <Canvas
          orthographic
          camera={{ zoom: 100, position: [0, 0, 100] }}
          shadows
          onCreated={(state) => state.gl.clearColor()}
        >
          <Suspense fallback={null}>
            <pointLight intensity={4} position={[-10, 10, 5]} />
            <ambientLight intensity={0.6} />
            <MachineLayout />
          </Suspense>
        </Canvas>
      </div>      
    </div>
    </div>
  );
}

export default App;
