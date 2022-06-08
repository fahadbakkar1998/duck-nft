import { FC } from 'react';
import { useMachineStore } from '../../store';
import { DuckData } from '../../types/types';

const DuckCard: FC<DuckData> = (data) => {
  const { currentDuckId, setCurrentDuckId, showAvailabilityOnDuckCards, showDuckIdOnDuckCards } = useMachineStore();

  const handleClick = () => {
    setCurrentDuckId(data.id);
  };

  const showSoldOverlay = data.owner && showAvailabilityOnDuckCards;

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer relative group ${currentDuckId === data?.id ? 'shadow-xl  border-4 border-[#ff5328]' : ''}`}
      id={`item${data.id}`}
    >
      <div className="absolute w-full h-full bg-orange-500 opacity-0 group-hover:opacity-50" />
      <img
        alt="Tozzi Duck"
        src={data.isCustom ? data.webp : `data:image/webp;base64,${data.webp}`}
      />
      {showDuckIdOnDuckCards && (
      <div className="absolute bottom-0 right-0 z-30 px-2 pt-1 text-sm text-white bg-orange-500 border-2 border-white rounded-l-lg pixel-font">
        {data.id.toString().padStart(3, '0')}
      </div>
      )}
      {showSoldOverlay && (
        <div className="flex items-center justify-center w-full h-full text-3xl text-white bg-black pixel-font text-opacity-90 absolute-center bg-opacity-80">
          SOLD
        </div>
      )}
    </div>
  );
};

export default DuckCard;
