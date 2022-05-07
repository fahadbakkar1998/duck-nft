import { useEffect } from "react";
import useMachineStore from "../../../store";
import StatusLight from "../StatusLight";

const StatusLights = () => {
  const { isSwitchingModes, machineMood, setMachineMood } = useMachineStore();

  useEffect(() => {
    if (isSwitchingModes) setMachineMood('happy');
    else setMachineMood(undefined);
  }, [isSwitchingModes]);

  return (
    <div className="absolute -top-[15.6%] left-[3.6%] z-50 flex space-x-[3.9%]">          
      <StatusLight color="green" className={`w-[17%] ${machineMood === 'happy' ? 'animate-think' : 'opacity-0'}`}/>
      <StatusLight color="red" className={`w-[17%] ${machineMood === 'sad' ? 'animate-think' : 'opacity-0'}`}/>
    </div>
  )
}


export default StatusLights;