
import { FC } from 'react';

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
        ${disabled ? "opacity-20" : ""}
        border border-white aspect-square 
        w-4 cursor-pointer
        ${isChecked ? "bg-white" : ""}
      `}
    />
  );
};

export default CheckBox;