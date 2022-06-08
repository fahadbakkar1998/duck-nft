import { FC, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick: () => any;
}

const Button: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative
        w-full h-full flex justify-center items-center
        transition
        cursor-pointer
      `}
    >
      <div
        className={`        
           mt-4 tracking-wide text-2xl h-full 
          transition duration-200
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default Button;
