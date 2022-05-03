
import toggleOn from "../../../assets/img/toggle-on.png";
import toggleOff from "../../../assets/img/toggle-off.png";
import { useState } from "react";

const ToggleSwitch = () => {
  const [isOn, setIsOn] = useState(false);
  return (
    <div  onClick={() => setIsOn(!isOn)} className="cursor-pointer w-[10%]">
      <img src={isOn ? toggleOn : toggleOff} alt="Toggle Switch" />
    </div>
  );
}


export default ToggleSwitch;