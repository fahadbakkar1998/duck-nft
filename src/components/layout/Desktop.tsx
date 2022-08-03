import { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { Cloud } from '@react-three/drei';
import Machine from '../Machine/index';
import bgImg from '../../assets/img/machine-bg.jpg';
import OwnersManualModal from '../OwnersManual/OwnersManualModal';
import useMachineStore from '../../store';
import BTI from '../Machine/BinaryToggleInterface';
import SideButtons from '../Machine/AltScreen/SideButtons';
import Background from './Background';
import TitleImage from './TitleImage';
import Footer from './Footer';

const Desktop = () => {
  const {
    isOwnersManualOpen,
    setIsOwnersManualOpen,
  } = useMachineStore();

  return (
    <div className="app-container overflow-hidden">
      <div
        className="mx-auto machine-container w-full 2xl:w-[80%]"
      >
        <BTI />
        {/* <SideButtons /> */}
        <TitleImage />
        <img className="z-0 absolute top-0 left-0 pointer-events-none" src={bgImg} alt="" />
        <Canvas
          className="absolute -top-[18.85%]"
          orthographic
          camera={{ zoom: 100, position: [0, 0, 100] }}
          onCreated={(state) => state.gl.clearColor()}
        >
          <Suspense fallback={null}>
            <pointLight intensity={4} position={[-10, 10, 5]} />
            <ambientLight intensity={0.6} />
            <Machine />
          </Suspense>
        </Canvas>
        <Footer />
      </div>
      <OwnersManualModal modalIsOpen={isOwnersManualOpen} setModalIsOpen={setIsOwnersManualOpen} />
    </div>
  );
};

export default Desktop;
