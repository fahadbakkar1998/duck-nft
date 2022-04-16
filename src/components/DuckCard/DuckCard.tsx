import "./DuckCard.scss";
import { useRef } from "react";
import { useMachineStore } from "../../store";
import { tozziDuckNum } from "../../utils/constants";

const DuckCard = (props: any) => {
  const ducks = useMachineStore((state) => state.ducks);
  const currentTozziDuckId = useMachineStore(
    (state) => state.currentTozziDuckId
  );
  const setCurrentTozziDuckId = useMachineStore(
    (state) => state.setCurrentTozziDuckId
  );

  const customDuckData = useMachineStore((state) => state.customDuckData);
  const currentCustomDuckId = useMachineStore(
    (state) => state.currentCustomDuckId
  );
  const setCurrentCustomDuckId = useMachineStore(
    (state) => state.setCurrentCustomDuckId
  );

  const numberRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLHeadingElement>(null);

  const handleClick = () => {
    setCurrentTozziDuckId(props.data.id);
  }

  return (
    <div 
      onClick={handleClick}
      className="border-0 cursor-pointer"
    >
       <img alt="pic" src={props.img}></img>
    </div>
  )
};

export default DuckCard;
