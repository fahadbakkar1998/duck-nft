import { FC, useRef, ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  className?: string;
  closeButton?: ReactNode;
}

const ModalButton = ({ onClose }: { onClose: () => void}) => (
  <div className="flex justify-end w-full">
    <div
      onClick={onClose}
      className="px-4 text-screen bg-white cursor-pointer"
    >
      Close
    </div>
  </div>
);

const Modal: FC<ModalProps> = ({ children, open, onClose, className, closeButton }) => {
  const closeRef = useRef<HTMLDivElement>(null);
  return open ? (
    <div
      className={className}
    >
      <div>{children}</div>
      {closeButton || <ModalButton onClose={onClose} />}
    </div>
  ) : null;
};

export default Modal;
