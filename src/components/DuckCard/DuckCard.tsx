import "./DuckCard.scss";
import { useRef, FC } from "react";
import { useMachineStore } from "../../store";
import { tozziDuckNum } from "../../utils/constants";
import { DuckCardProps } from "../../types/types";

const DuckCard: FC<DuckCardProps> = ({img, data, isCustom = false}) => {
  const {
    tozziDuckData,
    currentTozziDuckId,
    setCurrentTozziDuckId,
    customDuckData,
    currentCustomDuckId,
    setCurrentCustomDuckId,
  } = useMachineStore((state) => state);
  
  const numberRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLHeadingElement>(null);

  const handleClick = () => {
    setCurrentTozziDuckId(data.id);    
  }

  return (
    <div 
      onClick={handleClick}
      className={`cursor-pointer relative group`}
    >
      <div className="h-full w-full bg-orange-500  absolute opacity-0 group-hover:opacity-50" />
      <img alt="Tozzi Duck" src={img} />
      <div className="text-white pixel-font text-sm  absolute right-0 bottom-0 bg-orange-500 z-50 border-2 border-white px-2 pt-1 rounded-l-lg">
        {data.id.toString().padStart(3, '0')}
      </div>
      { data.owner && (
        <div className="text-white pixel-font text-opacity-90  absolute-center bg-black w-full h-full bg-opacity-80 flex items-center justify-center text-3xl">
          SOLD
        </div>
      )}
      
      
    </div>
  )
};

export default DuckCard;
