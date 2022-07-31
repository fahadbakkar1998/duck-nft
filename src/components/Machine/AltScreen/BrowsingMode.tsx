import { FC, useEffect, useMemo, useState } from 'react';
// eslint-disable-next-line import/no-relative-packages
import { motion, AnimatePresence } from '../../../../node_modules/framer-motion/dist/framer-motion';
import useMachineStore from '../../../store';
import DuckProfile from './DuckProfile';
import { DuckData } from '../../../types/types';
import { filterDucks } from '../../../utils/helpers';

const Shopping = () => {
  const {
    altIsStatic,
    showDuckProfile,
    currentDuckId,
    setAltMessage,
    duckFilters,
    account,
    ducks,
  } = useMachineStore();

  const [duck, setDuck] = useState<DuckData|null>();
  const filteredDucks = useMemo(() => filterDucks({ ducks, filters: duckFilters, account }), [duckFilters, account]);

  useEffect(() => {
    const duck = filteredDucks.find((d) => d.id === currentDuckId);
    setDuck(duck);
  }, [currentDuckId]);

  return duck ? (
    <div className="absolute z-10">
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
  ) : null;
};

export default Shopping;
