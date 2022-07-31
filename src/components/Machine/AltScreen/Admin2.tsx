/* eslint-disable no-console */
import { FC, useEffect, useState } from 'react';
import { indexOf } from 'lodash';
// eslint-disable-next-line import/no-relative-packages
import { motion, AnimatePresence } from '../../../../node_modules/framer-motion/dist/framer-motion';
import useMachineStore from '../../../store';

const NoDucks = () => {
  return (
    <div className="w-full h-full z-20 absolute bg-screenBlack pixel-font flex justify-center items-center">
      NO DUCKS TO REVIEW ATM
    </div>
  );
};

const DuckReviewLabel: FC<{duckNum: number, numDucks: number}> = ({ duckNum, numDucks }) => {
  return (
    <div
      className="
        pointer-events-none
        absolute px-4 py-2 bottom-5 right-2 rounded-md border-white border-2 shadow-md  pixel-font z-20
        bg-orange-500
      "
    >
      DUCK REVIEW {`(${duckNum}/${numDucks})`}
    </div>
  );
};

const Admin: FC = () => {
  const {
    altIsStatic,
    setCurrentAdminDuckId,
    currentAdminDuckId,
    ducks,
  } = useMachineStore();

  const burnableDucks = ducks.filter((duck) => duck.burnable);
  const duck = burnableDucks?.find((d) => d.id === currentAdminDuckId);
  const duckIndex = indexOf(ducks, duck) - 200;
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (burnableDucks.length) {
      setCurrentAdminDuckId(burnableDucks[0].id);
    }
  }, []);

  return burnableDucks.length ? (
    <div
      className="absolute z-10"
      onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
    >
      { !!duck && (
        <div className="h-full">
          <AnimatePresence>
            { !altIsStatic && (
              <div className="overflow-hidden bg-white bg-opacity-80">
                <DuckReviewLabel duckNum={duckIndex + 1} numDucks={burnableDucks.length} />
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
