import useMachineStore from '../../store';
// eslint-disable-next-line import/no-relative-packages
import { motion, AnimatePresence } from '../../../node_modules/framer-motion/dist/framer-motion';
import logo from '../../assets/img/logo-base.png';
import Floater from '../common/Floater';

const TitleImage = () => {
  const { openBurnForm } = useMachineStore();
  const animate = {
    y: [-15, -25, -15],
  };
  return (
    <motion.img
      animate={animate}
      transition={{ duration: 2, repeat: Infinity }}
      className="
        title-image
        z-50 absolute
        w-[55%] lg:w-[50%] 2xl:w-[50%]
        left-[12%] -top-[4%] 2xl:-top-[3%]
      "
      src={logo}
      alt="Tozzi Ducks"
    />
  );
};

export default TitleImage;
