import "./DuckCard.scss";
import { FC } from "react";
import { useMachineStore } from "../../store";
import { DuckData } from "../../types/types";

const DuckCard: FC<DuckData> = (data) => {
  const { currentDuckId, setCurrentDuckId } = useMachineStore();

  const handleClick = () => {
    setCurrentDuckId(data.id);
    console.log(data);
  };

  return (
    <div 
      onClick={handleClick} 
      className={`cursor-pointer relative group ${currentDuckId == data.id ? 'shadow-xl scale-110 z-50 border-4 border-[#ff5328]' : ''}`} 
      id={`item${data.id}`}
    >
      <div className="absolute w-full h-full bg-orange-500 opacity-0 group-hover:opacity-50" />
      <img alt="Tozzi Duck" src={`data:image/webp;base64,${data.webp}`} />
      <div className="absolute bottom-0 right-0 z-30 px-2 pt-1 text-sm text-white bg-orange-500 border-2 border-white rounded-l-lg pixel-font">
        {data.id.toString().padStart(3, "0")}
      </div>
      {data.owner && (
        <div className="flex items-center justify-center w-full h-full text-3xl text-white bg-black pixel-font text-opacity-90 absolute-center bg-opacity-80">
          SOLD
        </div>
      )}
    </div>
  );
};

export default DuckCard;
