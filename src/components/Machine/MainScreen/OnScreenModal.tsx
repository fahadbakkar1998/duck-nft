import { FC, useRef, ReactNode } from 'react';
import FormButton from './AdminMode/common/FormButton';
// eslint-disable-next-line import/no-relative-packages
import { motion, AnimatePresence } from '../../../../node_modules/framer-motion/dist/framer-motion';

interface ModalProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  className?: string;
  buttons?: ReactNode;
  position?: Object;
}

const defaultPosition = { x: '10%', y: '10%' };

const Modal: FC<ModalProps> = ({ children, open, onClose, className, buttons, position = defaultPosition }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      { open && (
        <motion.div
          initial={{ scale: 0, ...position }}
          animate={{ scale: 1, ...position }}
          exit={{ scale: 0, ...position }}
          transition={{ duration: 0.2 }}
          className={`   
            ${className}       
            absolute        
            black-screen        
            pixel-font text-white p-4 border-2 border-white
            w-5/6 h-5/6 text-xl
            flex flex-col justify-between items-start        
            z-50
          `}
        >
          <div className="w-full h-full">
            <div>{children}</div>
            { buttons || (
              <div className="absolute bottom-0 right-0">
                <FormButton label="Done" onClick={handleClose} />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
