import { FC, useRef, ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  className?: string;
}

const Modal: FC<ModalProps> = ({ children, open, onClose, className }) => {
  const closeRef = useRef<HTMLDivElement>(null);
  return open ? (
    <div
      className={`   
        ${className}       
        animate-zoomIn
        absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2          
        black-screen        
        pixel-font text-white p-2 border-2 border-white
        w-5/6 h-5/6 text-xl
        flex flex-col justify-between items-start        
        z-50
      `}
    >
      <div className="p-4 border-2 w-full h-full">
        <div>{children}</div>
        <div className="flex justify-end w-full">
          <div
            ref={closeRef}
            onClick={onClose}
            className={`
              absolute bottom-0 right-0
              px-4  py-1   
              text-screenBlack text-base bg-white cursor-pointer
              hover:bg-screenBlack hover:text-white hover:border hover:border-white
            `}
          >
            DONE
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
