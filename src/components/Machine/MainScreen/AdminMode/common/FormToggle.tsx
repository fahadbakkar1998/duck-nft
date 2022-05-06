import { FC } from 'react';

interface FormToggleProps {
  label: string;
  isSelected: boolean;
  onToggle: () => void;
}

const FormToggle: FC<FormToggleProps> = ({ label, isSelected, onToggle }) => {  
  return (
    <div
      onClick={onToggle}
      className={`             
        flex-1 bg-white cursor-pointer text-center text-base px-1 text-screenBlack
        ${isSelected ? 'bg-opacity-100 text-screenBlack' : 'bg-opacity-20'}
      `}
    >
      {label}
    </div>
  );
}

export default FormToggle;