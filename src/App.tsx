import { Suspense, useState } from "react";
import { Canvas } from "react-three-fiber";
import "./App.scss";
import { MachineLayout } from "./components/Machine/index";
// import bgImg from "./assets/img/duck-base-holepunch.png";
import bgImg from "./assets/img/machine-bg.jpg";
import { OrbitControls } from "@react-three/drei";
import Mobile from "./components/Mobile/Mobile";

function App() {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  return isMobile ? (
    <Mobile />
  ) : (
    <div className="App flex flex-col bg-[#ddd3c9]">      
      {/* TEST HEADER */}
      {/* <div className="h-96 w-full bg-[#ddd3c9]" /> */}

      <div className="header"></div>
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
        {/* <div className="w-[640px] left-4 h-24 z-0 absolute bg-green-100 rounded-full overflow-hidden">
          <video className="z-10" playsInline autoPlay muted loop src="/assets/video/static-wide.mp4" />
          
        </div> */}
        {/* <div className="w-[640px] left-4 h-24 opacity-30  absolute z-10 bg-green-200 rounded-full overflow-hidden" />   */}
        <div className="z-30 relative mx-auto">(Tozzi ducks&copy;)</div>
      </div>
      
      <div className="machine-container">
        <img className="background" src={bgImg} alt=""></img>
        <Canvas
          orthographic
          camera={{ zoom: 115, position: [0, 0, 200] }}
          shadows
          onCreated={(state) => state.gl.clearColor()}
        >
          <Suspense fallback={null}>
            <pointLight intensity={9} position={[0, 8, 10]} />
            <MachineLayout />
            {/* <OrbitControls /> */}
          </Suspense>
        </Canvas>
      </div>

      {/* <OwnersManual /> */}

      <div className="h-96 w-full bg-[#d7dad2]" />
    </div>
  );
}

export default App;
