import { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import './App.scss';
import Machine from './components/Machine/index';
import bgImg from './assets/img/machine-bg.png';
import logo from './assets/img/logo-base.png';
import Mobile from './components/Mobile/Mobile';
import OwnersManualModal from './components/OwnersManual/OwnersManualModal';
import useMachineStore from './store';
import BTI from './components/Machine/BinaryToggleInterface';
import SideButtons from './components/Machine/AltScreen/SideButtons';

const App = () => {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  const { isBurning, isOwnersManualOpen, setIsOwnersManualOpen } = useMachineStore();

  return isMobile ? (
    <Mobile />
  ) : (
    <div className="App flex flex-col">
      <div className="machine-container relative w-full">
        <div className={`
            bg-gradient-to-b from-[black] via-[black] to-[#d8d8d8]
            w-[85%] h-[55%] rounded-2xl absolute top-[32%] left-1/2 transform -translate-x-1/2  overflow-hidden  border-[#232035] border-[4px]
          `}
        >
          <video
            className={`${!isBurning ? 'animate-wow' : ''} w-full -mt-12 shadow-lg border-b-2 z-20 border-black border-opacity-25 absolute`}
            id="alt-static"
            playsInline
            autoPlay
            muted
            loop
            src={`/assets/video/${isBurning ? 'fire.mp4' : 'scum.mp4'}`}
          />
          <div className="absolute h-full w-full machine-shadow z-10" />
        </div>
        <img
          className={`
            ${!isBurning ? 'animate-wow' : ''} top-[25%] left-[13%] w-[60%] 
            absolute z-50
          `}
          src={logo}
          alt="Tozzi Ducks"
        />
        <BTI />
        <SideButtons />
        <img className="background pointer-events-none" src={bgImg} alt="" />
        <Canvas
          orthographic
          camera={{ zoom: 100, position: [0, 0, 100] }}
          shadows
          onCreated={(state) => state.gl.clearColor()}
        >
          <Suspense fallback={null}>
            <pointLight intensity={4} position={[-10, 10, 5]} />
            <ambientLight intensity={0.6} />
            <Machine />
          </Suspense>
        </Canvas>
      </div>
      <OwnersManualModal modalIsOpen={isOwnersManualOpen} setModalIsOpen={setIsOwnersManualOpen} />
    </div>
  );
};

export default App;
