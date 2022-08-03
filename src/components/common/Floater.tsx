import { ReactNode } from 'react';
// eslint-disable-next-line import/no-relative-packages
import { motion, AnimatePresence } from '../../../node_modules/framer-motion/dist/framer-motion';

interface FloaterProps {
  duration?: number,
  children: ReactNode,
  zIndex?: number,
  rotate?: boolean,
  magnitude?: number
}

const Floater = ({
  duration = 2,
  children,
  zIndex = 50,
  rotate = false,
  magnitude = 10,
}: FloaterProps) => {
  const noRotate = {
    y: [magnitude, -magnitude, magnitude],
  };

  const withRotate = {
    y: [-200, -200, 200],
    rotate: [10, -10, 10],
  };

  return (
    <motion.div
      className={`z-${zIndex}`}
      animate={rotate ? withRotate : noRotate}
      transition={{ duration, repeat: Infinity }}
    >
      {children}
    </motion.div>
  );
};

export default Floater;
