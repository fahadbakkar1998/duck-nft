
import toggleOn from "../../../assets/img/toggle-on.png";
import toggleOff from "../../../assets/img/toggle-off.png";
import { useState } from "react";

interface ToggleSwitchProps {
  value?: number;
  onClick: () => void;
}

const ToggleSwitch = ({value = 0, onClick}) => {  
  return (
    <div className="cursor-pointer w-[7.5%]" onClick={onClick}>
      <img src={!!value ? toggleOn : toggleOff} alt="Toggle Switch" />
    </div>
  );
}


export default ToggleSwitch;