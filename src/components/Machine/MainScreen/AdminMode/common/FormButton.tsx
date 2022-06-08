import { FC } from 'react';

interface FormButtonProps {
  label: string;
  onClick: () => void;
}

const FormButton: FC<FormButtonProps> = ({ label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`            
        px-2  py-1   
        text-screenBlack  bg-white bg-opacity-20 cursor-pointer
        hover:bg-opacity-100
      `}
    >
      {label}
    </div>
  );
};

export default FormButton;
