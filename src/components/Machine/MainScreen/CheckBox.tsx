import { FC } from 'react';
import { CheckIcon } from '@heroicons/react/solid';

interface CheckBoxProps {
  isChecked: boolean;
  disabled?: boolean;
  onToggle: () => void;
}

const CheckBox: FC<CheckBoxProps> = ({
  isChecked,
  disabled = false,
  onToggle,
}) => {
  return (
    <div
      onClick={disabled ? () => {} : onToggle}
      className={`
        ${disabled ? 'opacity-20' : ''}
        border border-white aspect-square 
        w-6 cursor-pointer
        ${isChecked ? 'bg-white' : ''}
      `}
    >
      {isChecked && (<CheckIcon className="absolute h-6 flex fill-screenBlack" />)}
    </div>
  );
};

export default CheckBox;
