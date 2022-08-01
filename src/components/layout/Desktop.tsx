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

const Desktop = () => {
  const {
    isOwnersManualOpen,
    setIsOwnersManualOpen,
  } = useMachineStore();

  return (
    <div className="App flex items-center justify-center">
      <div className="flex flex-col items-start machine-container relative w-full 2xl:w-[85%]">
        {/* <BTI /> */}
        {/* <SideButtons /> */}
        <TitleImage />
        <img className="background pt-20 pointer-events-none" src={bgImg} alt="" />
        <div className=" absolute w-full h-full  -top-[8.8%]  left-0 ">
          <Canvas
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
        </div>
      </div>
      <OwnersManualModal modalIsOpen={isOwnersManualOpen} setModalIsOpen={setIsOwnersManualOpen} />
    </div>
  );
};

export default Desktop;
