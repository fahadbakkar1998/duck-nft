/* eslint-disable no-console */
import { FC, useEffect, useState } from 'react';
import { indexOf } from 'lodash';
// eslint-disable-next-line import/no-relative-packages
import { motion, AnimatePresence } from '../../../../node_modules/framer-motion/dist/framer-motion';
import { useDucks } from '../../../state/hooks';
import useMachineStore from '../../../store';

const NoDucks = () => {
  return (
    <div className="w-full h-full bg-screenBlack pixel-font flex justify-center items-center">
      NO DUCKS TO REVIEW ATM
    </div>
  );
};

const DuckReviewLabel: FC<{duckNum: number, numDucks: number}> = ({ duckNum, numDucks}) => {
  return (
    <motion.div
      className="
        pointer-events-none
        absolute bottom-2 right-0 px-4 py-2 rounded-l-md border-white border-2 shadow-md  pixel-font z-20 border-r-0 border-b-0
        bg-orange-500
      "
    >
      DUCK REVIEW {`(${duckNum}/${numDucks})`}
    </motion.div>
  );
};

const Admin: FC = () => {
  const {
    altIsStatic,
    setCurrentAdminDuckId,
    currentAdminDuckId,
  } = useMachineStore();
  const { data: ducksData = [], isLoading } = useDucks();
  const ducks = !isLoading ? ducksData.filter((d) => d.burnable) : [];
  const duck = ducks?.find((d) => d.id === currentAdminDuckId);
  const duckIndex = indexOf(ducks, duck);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (ducks.length) {
      setCurrentAdminDuckId(ducks[0].id);
    }
  }, []);

  return ducks.length ? (
    <div
      className="absolute z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      { !!duck && (
        <div className="h-full">
          <AnimatePresence>
            { !altIsStatic && (
              <div className="overflow-hidden bg-white bg-opacity-80">
                <AnimatePresence>
                  { !isHovered && <DuckReviewLabel duckNum={duckIndex + 1} numDucks={ducks.length} /> }
                </AnimatePresence>
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
  ) : <NoDucks />;
};

export default Admin;
