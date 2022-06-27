import { FC, useRef } from 'react';

interface FormButtonProps {
  label: string;
  onClick: () => void;
}

const FormButton: FC<FormButtonProps> = ({ label, onClick }) => {
  const ref = useRef<any>();
  const handleClick = () => {
    ref.current?.classList.add('animate-blink');
    setTimeout(() => { ref.current?.classList.remove('animate-blink'); }, 300);
    onClick();
  };

  return (
    <div
      ref={ref}
      onClick={handleClick}
      className={`            
        px-2  py-1 text-base   
        text-screenBlack  bg-white bg-opacity-40 cursor-pointer
        hover:bg-opacity-100
      `}
    >
      {label}
    </div>
  );
};

export default FormButton;
