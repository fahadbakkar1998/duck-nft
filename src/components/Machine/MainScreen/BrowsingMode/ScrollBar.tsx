import { FC, useEffect } from 'react';
// eslint-disable-next-line import/no-relative-packages
import { motion, useMotionValue } from '../../../../../node_modules/framer-motion/dist/framer-motion';

const normalizeScrollPosition = (position: number) => {
  return (position * 120) - 120;
};

const ScrollBar: FC<{position: number}> = ({ position }) => {
  const y = useMotionValue(-120);

  useEffect(() => {
    y.set(normalizeScrollPosition(position));
  }, [position]);

  useEffect(() => y.onChange((latest) => {
    const normalized = (latest + 120) / 120;
    const screenDiv = document.getElementById('mainscreen');
    const screenHeight = screenDiv?.clientHeight;
    const gridHeight = document.getElementById('grid')?.clientHeight;
    // @ts-ignore
    screenDiv.scrollTop = normalized * (gridHeight - screenHeight);
  }), []);

  return (
    <div
      className="relative rounded-full bg-gray-900 border-gray-600 border h-32 w-3
      flex justify-center"
    >
      <motion.div
        style={{ y }}
        drag="y"
        dragElastic={0}
        dragMomentum={false}
        dragSnapToOrigin={false}
        dragConstraints={{ top: -120, bottom: 0 }}
        className="top-[90%] absolute bg-orange-400 w-5 h-5 rounded-full"
      />
    </div>
  );
};

export default ScrollBar;
