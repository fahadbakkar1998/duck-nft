import { FC } from 'react';
import useSound from 'use-sound';
import { useMachineStore } from '../../store';
import { DuckData } from '../../types/types';
// @ts-ignore
import tvNoise from '../../assets/audio/tv.mp3';

const DuckCard: FC<DuckData> = (data) => {
  const { currentDuckId, setCurrentDuckId, showAvailabilityOnDuckCards, showDuckIdOnDuckCards } = useMachineStore();
  const [playTvNoise] = useSound(tvNoise, { volume: 0.5 });
  const handleClick = () => {
    playTvNoise();
    setCurrentDuckId(data.id);
  };

  const unsoldCollabs = [200, 202, 203, 204, 205, 206, 207, 208, 209];

  const showSoldOverlay = data.owner && showAvailabilityOnDuckCards && !unsoldCollabs.includes(data.id);

  return (
    <div
      onClick={handleClick}
      className={`select-none cursor-pointer relative group ${currentDuckId === data?.id ? 'shadow-xl  border-4 border-[#ff5328]' : ''}`}
      id={`item${data.id}`}
    >
      <div className="absolute w-full h-full bg-orange-500 opacity-0 group-hover:opacity-50" />
      <img
        alt="Tozzi Duck"
        className="pixel-art"
        src={data.isCustom ? data.webp : `data:image/webp;base64,${data.webp}`}
      />
      {showDuckIdOnDuckCards && (
      <div className="absolute bottom-0 right-0 z-30 px-2 pt-1 text-sm text-white bg-orange-500 border-2 border-white rounded-l-lg pixel-font">
        {data.id.toString().padStart(3, '0')}
      </div>
      )}
      {showSoldOverlay && (
        <div
          className="flex items-center justify-center w-full h-full text-2xl text-white bg-black pixel-font text-opacity-80 absolute-center bg-opacity-60"
        >
          SOLD
        </div>
      )}
    </div>
  );
};

export default DuckCard;
