import { FC, useState } from 'react';
// eslint-disable-next-line import/no-relative-packages
import { motion, AnimatePresence } from '../../../../../../node_modules/framer-motion/dist/framer-motion';
import { MachineConfig } from '../../../../../types/types';
import useMachineStore from '../../../../../store';
import NavButton from './NavButton';
import { mintStatusName } from '../../../../../utils/helpers';

interface SlideProps {
  config?: MachineConfig | undefined;
}

const TozziSlide: FC<SlideProps> = ({ config }) => {
  return (
    <div className="w-full flex justify-between px-4 items-center">
      <div className="px-3 text-[#656b4d] transparent bg-black opacity-75">
        tozzi ducks
      </div>
      <div>
        { config ? `status: ${mintStatusName(config.tozziMintStatus)}` : '--' }
      </div>
      <div>
        { config ? `price: ${config.tozziMintPrice || ''} eth` : '--' }
      </div>
    </div>
  );
};

const CustomSlide: FC<SlideProps> = ({ config }) => {
  return (
    <div className="w-full flex justify-between px-4 items-center">
      <div className="px-3 text-[#656b4d] transparent bg-black opacity-75">
        custom ducks
      </div>
      <div>
        { config ? `status: ${mintStatusName(config.customMintStatus)}` : '--' }
      </div>
      <div>
        { config ? `price: ${config.customMintPrice || ''} eth` : '--' }
      </div>
    </div>
  );
};

const ManualSlide: FC<SlideProps> = ({ config }) => {
  const { setIsOwnersManualOpen, isOwnersManualOpen } = useMachineStore();
  return (
    <div className="w-full flex justify-between px-4 items-center">
      <div>
        owner: --
      </div>
      <div>
        population: 0/200
      </div>
      <button
        type="button"
        className="hover:font-bold"
        onClick={() => {
          document.body.style.overflow = 'hidden';
          setIsOwnersManualOpen(!isOwnersManualOpen);
        }}
      >
        View Manaual
      </button>
    </div>
  );
};

const StatusSlides: FC<{config: MachineConfig | undefined}> = ({ config }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [showSlide, setShowSlide] = useState(true);

  const slideContent = [
    <TozziSlide config={config} />,
    <CustomSlide config={config} />,
    <ManualSlide config={config} />,
  ];

  const handleNext = () => {
    if (slideIndex !== slideContent.length - 1) {
      setShowSlide(false);
      setSlideIndex((slideIndex + 1));
      setTimeout(() => setShowSlide(true), 200);
    }
  };

  const handlePrev = () => {
    if (slideIndex > 0) {
      setShowSlide(false);
      setSlideIndex((slideIndex - 1));
      setTimeout(() => setShowSlide(true), 200);
    }
  };

  return (
    <div className="absolute flex justify-between w-full items-center pr-[10%] select-none text-xs">
      <NavButton
        disabled={slideIndex === 0}
        onClick={handlePrev}
      />
      <AnimatePresence>
        { showSlide && (
          <motion.div
            className="w-full"
            key={slideIndex}
            initial={{ y: -100, opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.20 }}
          >
            {slideContent[slideIndex]}
          </motion.div>
        )}
      </AnimatePresence>
      <NavButton
        flipped
        disabled={slideIndex === slideContent.length - 1}
        onClick={handleNext}
      />
    </div>
  );
};

export default StatusSlides;
