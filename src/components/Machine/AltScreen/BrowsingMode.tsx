import { FC, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-relative-packages
import { motion, AnimatePresence } from '../../../../node_modules/framer-motion/dist/framer-motion';
import useMachineStore from '../../../store';
import DuckProfile from './DuckProfile';
import { DuckData } from '../../../types/types';
import Static from './Static';

const Shopping = () => {
  const {
    altIsStatic,
    showDuckProfile,
    currentDuckId,
    setAltMessage,
    filteredDucks,
  } = useMachineStore();

  const [duck, setDuck] = useState<DuckData|null>();

  useEffect(() => {
    const duck = filteredDucks.find((d) => d.id === currentDuckId);
    setDuck(duck);
  }, [currentDuckId, filteredDucks]);

  return duck ? (
    <div className="absolute z-10">
      <DuckProfile show={showDuckProfile} duck={duck} />
      <div className="h-full">
        <div className={`top-[21%] absolute scale-[1.75]  z-40 ${altIsStatic ? 'visible' : 'invisible'}`}>
          <video
            id="alt-static"
            playsInline
            autoPlay
            muted
            loop
            src="/assets/video/static.mp4"
          />
        </div>
        <div
          className="overflow-hidden bg-white bg-opacity-80"
        >
          <motion.img
            initial={{ scale: 0, opacity: 0, borderRadius: '100%' }}
            animate={{ scale: 1, opacity: 1, borderRadius: '0%' }}
            transition={{ duration: 0.10 }}
            alt={`Duck ${duck.id}`}
            src={duck.isCustom ? duck.webp : `data:image/webp;base64,${duck.webp}`}
          />
        </div>
        <div className="w-full h-full" />
      </div>
    </div>
  ) : null;
};

export default Shopping;
