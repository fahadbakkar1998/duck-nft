import { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import "./App.scss";
import { MachineLayout } from "./components/Machine/index";
import bgImg from "./assets/img/machine-bg.png";
import Mobile from "./components/Mobile/Mobile";
import OwnersManualModal from "./components/OwnersManual/OwnersManualModal";
import useMachineStore from "./store";
import ToggleSwitch from "./components/Machine/BinaryToggleInterface/ToggleSwitch";
import BTI from "./components/Machine/BinaryToggleInterface";

function App() {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    const isOwnersModalOpen = useMachineStore((state) => state.isOwnersManalOpen);
    const setIsOwnersManualOpen = useMachineStore((state) => state.setIsOwnersManualOpen);

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
        <BTI />
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
      <OwnersManualModal modalIsOpen={isOwnersModalOpen} setModalIsOpen={setIsOwnersManualOpen} />      
    </div>
    </div>
  );
}

export default App;
