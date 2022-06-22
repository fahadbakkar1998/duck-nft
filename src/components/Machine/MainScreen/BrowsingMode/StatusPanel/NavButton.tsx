import { FC } from 'react';
import { LcdNavButtonProps } from '../../../../../types/types';
import { PixelArrow } from '../../../../../icons';

const NavButton: FC<LcdNavButtonProps> = ({
  onClick, disabled = false, flipped = false,
}) => {
  return (
    <div
      className={`
        w-4 h-4 transition  relative
        ${disabled ? 'opacity-20' : 'cursor-pointer opacity-75 hover:opacity-100'}
        ${flipped ? 'transform rotate-180' : ''}
      `}
      onClick={onClick}
    >
      <PixelArrow className="w-full h-full transform rotate-180" />
    </div>
  );
};

export default NavButton;
