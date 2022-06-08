import { FC } from 'react';

interface CheckBoxProps {
  isSelected: boolean;
  onClick: () => void;
  label?: string;
  className?: string;
}

const CheckBox: FC<CheckBoxProps> = ({ isSelected, onClick, label, className }) => {
  return (
    <div
      onClick={onClick}
      className={`
        cursor-pointer
        ${className}
        inline
        pixel-font
        ${
          isSelected ?
            'opacity-100 bg-orange-500 text-[#080808]' :
            'opacity-20 bg-white text-[#080808]'
        }
            py-1
      `}
    >
      { label ?? <div>yes</div> }
    </div>
  );
};

export default CheckBox;
