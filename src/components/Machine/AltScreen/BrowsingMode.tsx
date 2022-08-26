import { FC, useEffect, useState } from 'react';
import useMachineStore from '../../../store';
import DuckProfile from './DuckProfile';
import { DuckData } from '../../../types/types';

const Shopping: FC = () => {
  const {
    showDuckProfile,
    currentDuckId,
    filteredDucks,
  } = useMachineStore();

  const [duck, setDuck] = useState<DuckData|null>();

  useEffect(() => {
    const duck = filteredDucks.find((d) => d.id === currentDuckId);
    setDuck(duck);
  }, [currentDuckId, filteredDucks]);

  return duck ? (
    <div className="absolute z-10">
      <DuckProfile show={showDuckProfile} duck={duck} />
      <div className="h-full">
        <div
          className="overflow-hidden bg-white bg-opacity-80"
        >
          <img
            alt={`Duck ${duck.id}`}
            className="pixel-art"
            src={duck.isCustom ? duck.webp : `data:image/webp;base64,${duck.webp}`}
          />
        </div>
        <div className="w-full h-full" />
      </div>
    </div>
  ) : null;
};

export default Shopping;
