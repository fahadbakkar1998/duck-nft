import useSound from 'use-sound';
import useMachineStore from '../../../store';
import ToggleSwitch from './ToggleSwitch';
import { MachineMode } from '../../../utils/constants';
// @ts-ignore
import tv from '../../../assets/audio/tv.mp3';

const BTI = () => {
  const { currentDuckId, setCurrentDuckId, currentMode } = useMachineStore();
  const [play] = useSound(tv);
  function toBinary(integer) {
    const str = integer.toString(2);
    return str.padStart(8, '0').split('').reverse().join('');
  }
  const isOn = (index: number) => {
    return parseInt(toBinary(currentDuckId)[index]);
  };

  const toggleSwitch = (index: number) => {
    if (currentMode !== MachineMode.Shopping) return;
    const valence = isOn(index) ? -1 : 1;
    const newDuckId = currentDuckId + (valence * (2 ** index));
    if (newDuckId <= 199) {
      play();
      setCurrentDuckId(newDuckId);
      document.getElementById(`item${newDuckId}`)?.scrollIntoView({ block: 'nearest' });
    }
  };

  const renderSwitches = () => {
    return [7, 6, 5, 4, 3, 2, 1, 0].map((num) => {
      return (
        <ToggleSwitch
          disabled={currentMode !== MachineMode.Shopping}
          key={num}
          value={isOn(num)}
          onClick={() => toggleSwitch(num)}
        />
      );
    });
  };

  return (
    <div
      className={`
        flex gap-[1%] z-50 absolute 
        top-[74.75%] left-[64%] 
        -translate-x-1/2 -translate-y-1/2
      `}
    >
      {renderSwitches()}
    </div>
  );
};

export default BTI;
