import { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { Cloud } from '@react-three/drei';
import Machine from '../Machine/index';
// eslint-disable-next-line import/no-relative-packages
import { motion, AnimatePresence } from '../../../node_modules/framer-motion/dist/framer-motion';
import bgImg from '../../assets/img/machine-bg.jpg';
import OwnersManualModal from '../OwnersManual/OwnersManualModal';
import useMachineStore from '../../store';
import BTI from '../Machine/BinaryToggleInterface';
import TitleImage from './TitleImage';
import Footer from './Footer';
import overlay1 from '../../assets/img/overlay_1.png';

const Desktop = () => {
  const {
    isOwnersManualOpen,
    setIsOwnersManualOpen,
  } = useMachineStore();

  return (
    <div className="bg-opacity">
      {/* <div className="w-full h-full absolute bg-black bg-opacity-70 pointer-events-none" style={{ zIndex: 100 }} /> */}
      <div className="app-container overflow-hidden">
        <div className="mx-auto machine-container w-full 2xl:w-[80%]">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ zIndex: 100 }}
              className="absolute w-full drop-shadow pointer-events-none "
            >
              <img src={overlay1} alt="overvlay" />
            </motion.div>
          </AnimatePresence>
          <BTI />
          <TitleImage />
          <img className="z-0 absolute top-0 left-0 pointer-events-none" src={bgImg} alt="" />
          <Canvas
            className="absolute z-10 -top-[18.85%]"
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
    </div>
  );
};

export default Desktop;
