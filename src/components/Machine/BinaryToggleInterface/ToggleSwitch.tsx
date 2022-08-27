import { useState } from 'react';
import toggleOn from '../../../assets/img/toggle-on.png';
import toggleOff from '../../../assets/img/toggle-off.png';

interface ToggleSwitchProps {
  disabled: boolean;
  value?: number;
  onClick: () => void;
}

const ToggleSwitch = ({ value = 0, onClick, disabled }: ToggleSwitchProps) => {
  return (
    <div className={`${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} w-[7.5%]`} onClick={onClick}>
      <img src={value ? toggleOn : toggleOff} alt="Toggle Switch" />
    </div>
  );
};

export default ToggleSwitch;
