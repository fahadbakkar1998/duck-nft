import { FC, useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Html } from '@react-three/drei';
import { useThree } from 'react-three-fiber';
import { MachineMode, minViewLength } from '../../../../utils/constants';
import { useDToolStore } from '../../../../store/dtoolStore';
import useMachineStore from '../../../../store';
// eslint-disable-next-line import/no-relative-packages
import { motion, AnimatePresence } from '../../../../../node_modules/framer-motion/dist/framer-motion';

const ColorPicker: FC = () => {
  const { DToolInst, selectedColor, setSelectedColor } = useDToolStore();
  const { viewport } = useThree();
  const min = viewport.width;
  const bgColor = selectedColor || '#FFFFFF';

  return (
    <Html
      scale={[
        (0.18 * min) / minViewLength,
        (0.18 * min) / minViewLength,
        (0.18 * min) / minViewLength,
      ]}
      position={[-0.144 * min, -0.22 * min, 0]}
      rotation={[0.0, 0.0, 0.0]}
      transform
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="ColorPicker"
        style={{ backgroundColor: bgColor }}
      >
        <HexColorPicker
          color={bgColor}
          onChange={(color) => {
            if (!color) return;
            setSelectedColor(color);
            DToolInst.selectColor(color);
          }}
        />
      </motion.div>
    </Html>
  );
};

export default ColorPicker;
