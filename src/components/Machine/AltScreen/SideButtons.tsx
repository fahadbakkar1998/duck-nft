import { FC, useState } from 'react';
import sideButton from '../../../assets/img/aux-side-button.png';

interface SideButtonProps {
  isSelected: boolean,
  onClick: () => void;
}

const Button: FC<SideButtonProps> = ({ isSelected, onClick }) => {
  return (
    <div className="h-[22%] cursor-pointer" onClick={onClick}>
      <img
        className={`
          transition-all duration-100 h-full
          ${isSelected ? 'ml-[30%]' : ''}
        `}
        src={sideButton}
        alt="Background select button"
      />
    </div>
  );
};
const SideButtons = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="flex flex-col absolute z-[9] left-[15.36%] top-[55.75%] h-[10.5%] space-y-[25%] overflow-x-hidden">
      <Button isSelected={index === 0} onClick={() => setIndex(0)} />
      <Button isSelected={index === 1} onClick={() => setIndex(1)} />
      <Button isSelected={index === 2} onClick={() => setIndex(2)} />
    </div>
  );
};

export default SideButtons;
