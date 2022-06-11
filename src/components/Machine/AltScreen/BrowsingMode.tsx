import { FC } from 'react';
// eslint-disable-next-line import/no-relative-packages
import { motion, AnimatePresence } from '../../../../node_modules/framer-motion/dist/framer-motion';
import { useDucks } from '../../../state/hooks';
import useMachineStore from '../../../store';
import DuckProfile from './DuckProfile';

const Shopping = () => {
  const { altIsStatic, showDuckProfile, currentDuckId, setAltMessage } = useMachineStore();
  const { data: ducksData = [], isLoading } = useDucks();
  const ducks = !isLoading ? ducksData : [];
  const duck = ducks?.[currentDuckId];

  return (
    <div className="relative">
      <DuckProfile show={showDuckProfile} duck={duck} />
      { true && (
        <div className="h-full">
          <AnimatePresence>
            { !altIsStatic && (
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
            )}
          </AnimatePresence>
          <div className="w-full h-full" />
        </div>
      )}
    </div>
  );
};

export default Shopping;
