import { useState, useEffect } from "react";
import useMachineStore from "../../../store";
import ToggleSwitch from "./ToggleSwitch";

const BTI = () => {
  const { currentDuckId, setCurrentDuckId } = useMachineStore();

  const isOn = (index: number) => {
    return parseInt(toBinary(currentDuckId)[index]);
  }

  function toBinary(integer) {
    let str = integer.toString(2);
    return str.padStart(8, "0").split("").reverse().join("");
  }

  const toggleSwitch = (index: number) => {
    const valence = isOn(index) ? -1 : 1;
    const newDuckId = currentDuckId + (valence * (2**index));
    if( newDuckId <= 199 ) setCurrentDuckId(newDuckId);    
  }  

  const renderSwitches = () => {
    return [7, 6, 5, 4, 3, 2, 1, 0].map((num) => {
      return (
        <ToggleSwitch 
          key={num}
          value={isOn(num)}
          onClick={() => toggleSwitch(num)} 
        />
      )
    })           
  }

  return (
    <div 
      className={`
        flex gap-[1%] z-50 absolute 
        top-[77.6%] left-[64%] 
        -translate-x-1/2 -translate-y-1/2
      `}       
    >
      {renderSwitches()}
    </div>
  );
}

export default BTI;