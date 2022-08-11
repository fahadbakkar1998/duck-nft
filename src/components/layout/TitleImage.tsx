/* eslint-disable no-nested-ternary */
import useMachineStore from '../../store';
// eslint-disable-next-line import/no-relative-packages
import { motion, AnimatePresence } from '../../../node_modules/framer-motion/dist/framer-motion';
import logo from '../../assets/img/logo-base.png';
import t from '../../assets/img/tozzi-logo/t.png';
import o from '../../assets/img/tozzi-logo/o.png';
import z1 from '../../assets/img/tozzi-logo/z1.png';
import z2 from '../../assets/img/tozzi-logo/z2.png';
import i from '../../assets/img/tozzi-logo/i.png';
import d from '../../assets/img/tozzi-logo/d.png';
import u from '../../assets/img/tozzi-logo/u.png';
import c from '../../assets/img/tozzi-logo/c.png';
import k from '../../assets/img/tozzi-logo/k.png';
import s from '../../assets/img/tozzi-logo/s.png';
import Floater from '../common/Floater';

const letters = [t, o, z1, z2, i, d, u, c, k, s];

const TitleImage = () => {
  const { showOverlay } = useMachineStore();
  const animate = {
    y: [-15, -35, -15],
  };
  return (
    <div
      style={{ zIndex: 110 }}
      className="flex absolute w-1/2 -top-[1%] 2xl:top-0 left-[12%] title-image"
    >
      {letters.map((img, index) => {
        return (
          <motion.div
            key={`title-image-${img}`}
            animate={animate}
            transition={{ duration: 3, repeat: Infinity, delay: 0.2 * index }}
            className={`${index === 1 ? '-ml-[2%]' : (index === 5 ? 'ml-[5%]' : '')} ${showOverlay ? 'hue-rotate-[-140deg] duration-500 transition-all' : '0'}`}
          >
            <img src={img} alt="foo" className="" />
          </motion.div>
        );
      })}
    </div>
  );
};

export default TitleImage;
