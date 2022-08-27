import { FC } from 'react';
import DuckGrid from './common/DuckGrid';
// eslint-disable-next-line import/no-relative-packages
import { motion, AnimatePresence } from '../../node_modules/framer-motion/dist/framer-motion';
import useMachineStore from '../store';
import Static from './Machine/AltScreen/Static';

interface LandingPageProps {
  onClick: () => void;
}

const LandingPage: FC<LandingPageProps> = ({ onClick }) => {
  const { keyPadLoaded } = useMachineStore();
  return (
    <motion.div className="flex justify-center">
      <DuckGrid />
      <div className="fixed z-[1000] w-screen h-screen max-w-screen-xl flex flex-col items-center justify-center">
        <div className="w-full">
          <img
            className="w-full pixel-art"
            src="assets/images/pixel-duck.png"
            alt="logo"
          />
        </div>
        <AnimatePresence>
          <div
            onClick={keyPadLoaded ? onClick : () => {}}
            className="
              p-4
              text-2xl -mt-10
              bg-[#00c7ff] bg-opacity-75 text-white pixel-font text-shadow
              space-y-4 cursor-pointer hover:scale-105 transition
              border-8 rounded-full shadow-xl border-orange-500
            "
          >
            { keyPadLoaded ? 'Launch Duck Machine' : 'Please Wait...' }
          </div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LandingPage;
