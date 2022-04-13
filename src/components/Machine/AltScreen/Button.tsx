import { FC } from "react";

interface ButtonProps {
  label: string;
  onClick: () => any;
}

const Button: FC<ButtonProps> = ({label, onClick}) => {
  return (    
    <div 
      onClick={onClick}
      className={`
        relative
        w-full h-full flex justify-center items-center
        hover:bg-green-500 transition
        cursor-pointer
      `}
    >
      <div 
        className={`        
          text-center text-white pixel-font tracking-wide
        `}         
      >
        {label.toUpperCase()}
      </div>
    </div>
  );
}

export default Button;