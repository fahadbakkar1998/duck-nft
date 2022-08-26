import { FC, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick: () => any;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({ children, onClick, disabled = false }) => {
  return (
    <div
      onClick={!disabled ? onClick : () => {}}
      className={`
        relative
        w-full h-full flex justify-center items-center
        transition        
        ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer opacity-100'}
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
