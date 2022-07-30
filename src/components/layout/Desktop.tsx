import { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import Machine from '../Machine/index';
import bgImg from '../../assets/img/machine-bg.png';
import OwnersManualModal from '../OwnersManual/OwnersManualModal';
import useMachineStore from '../../store';
import BTI from '../Machine/BinaryToggleInterface';
import SideButtons from '../Machine/AltScreen/SideButtons';
import Background from './Background';
import TitleImage from './TitleImage';

const Desktop = () => {
  const {
    isOwnersManualOpen,
    setIsOwnersManualOpen,
  } = useMachineStore();

  return (
    <div className="App flex flex-col">
      <div className="machine-container relative w-full">
        <Background />
        <TitleImage />
        <BTI />
        <SideButtons />
        <img className="background pointer-events-none" src={bgImg} alt="" />
        <Canvas
          className="select-none"
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

export default Desktop;
