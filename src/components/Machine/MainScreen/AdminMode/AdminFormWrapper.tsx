import { ReactNode, FC } from 'react';
// eslint-disable-next-line import/no-relative-packages
import { motion, AnimatePresence } from '../../../../../node_modules/framer-motion/dist/framer-motion';

interface AdminFormWrapperProps {
  children: ReactNode
}

const AdminFormWrapper: FC<AdminFormWrapperProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex mt-4 flex-col h-full relative"
    >
      {children}
    </motion.div>
  );
};

export default AdminFormWrapper;
