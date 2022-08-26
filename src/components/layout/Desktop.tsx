import { Suspense, useState } from 'react';
import { Canvas } from 'react-three-fiber';
import Machine from '../Machine/index';
// eslint-disable-next-line import/no-relative-packages
import { motion, AnimatePresence } from '../../../node_modules/framer-motion/dist/framer-motion';
import bgImg from '../../assets/img/machine-bg.jpg';
import OwnersManualModal from '../OwnersManual/OwnersManualModal';
import useMachineStore from '../../store';
import BTI from '../Machine/BinaryToggleInterface';
import TitleImage from './TitleImage';
import Footer from './Footer';
import browsingOverlay from '../../assets/img/browsing-overlay.png';
import customizerOverlay from '../../assets/img/customizer-overlay.png';
import adminOverlay from '../../assets/img/admin-overlay.png';
import LandingPage from '../LandingPage';

const overlays = [undefined, browsingOverlay, customizerOverlay, adminOverlay];

const Desktop = () => {
  const {
    currentMode,
    isOwnersManualOpen,
    setIsOwnersManualOpen,
    showOverlay,
    setShowOverlay,
  } = useMachineStore();

  const [showLandingPage, setShowLandingPage] = useState(true);

  return (
    <div className="bg-opacity">
      { showLandingPage && <LandingPage onClick={() => setShowLandingPage(false)} /> }
      <AnimatePresence>
        { showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full absolute bg-black bg-opacity-80 color"
            style={{ zIndex: 100 }}
          >
            <div
              onClick={() => setShowOverlay(false)}
              style={{ zIndex: 110 }}
              className="cursor-pointer absolute footer-link white pixel-font text-5xl right-[5%] top-[5%]"
            >
              X
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="app-container overflow-hidden">
        <div className="mx-auto machine-container w-full 2xl:w-[80%]">
          <AnimatePresence>
            {showOverlay && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ zIndex: 100 }}
                className="drop-glow absolute w-full pointer-events-none "
              >
                <img src={overlays[currentMode]} alt="Duck Browser Guide" />
              </motion.div>
            )}
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
