/* eslint-disable no-console */
import { FC, useEffect, useState } from 'react';
import { sample } from 'lodash';
// eslint-disable-next-line import/no-relative-packages
import { motion, AnimatePresence } from '../../../../node_modules/framer-motion/dist/framer-motion';
import { useDucks } from '../../../state/hooks';
import useMachineStore from '../../../store';
import DuckProfile from './DuckProfile';
import { DuckData } from '../../../types/types';

const Admin: FC = () => {
  const {
    altIsStatic,
    currentDuckId,
    setCurrentDuckId,
    setCurrentAdminDuckId,
    currentAdminDuckId,
    changeChannel,
  } = useMachineStore();
  const { data: ducksData = [], isLoading } = useDucks();
  const ducks = !isLoading ? ducksData.filter((d) => d.burnable) : [];
  const duck = ducks?.find((d) => d.id === currentAdminDuckId);

  // const handleSetDuck: (id: number): void => {
  //   set((state) => {
  //     state.changeChannel(250);
  //     setTimeout(() => {
  //       set({ machineMood: undefined, altIsStatic: false });
  //     }, 350);
  //     return { showDuckProfile: false, currentDuckId: id };
  //   });
  // },

  useEffect(() => {
    if (ducks.length) {
      setCurrentAdminDuckId(ducks[0].id);
    }
  }, []);

  const handleClick = () => {
    setCurrentAdminDuckId(sample(ducks).id);
  };

  return (
    <div className="absolute z-10">
      { !!duck && (
        <div className="h-full" onClick={handleClick}>          
          <AnimatePresence>
            { !altIsStatic && (
              <div className="overflow-hidden bg-white bg-opacity-80">
                <div
                  className="
                    pointer-events-none
                    absolute bottom-2 right-2 px-4 py-2 rounded-l-md border-white border-2 shadow-md  pixel-font z-20 border-r-0 border-b-0
                    bg-orange-500
                  "
                >
                  DUCK REVIEW
                </div>
                <motion.img
                  initial={{ scale: 0, opacity: 0, borderRadius: '100%' }}
                  animate={{ scale: 1, opacity: 1, borderRadius: '0%' }}
                  transition={{ duration: 0.10 }}
                  alt={`Duck ${duck.id}`}
                  src={duck.webp}
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

export default Admin;
