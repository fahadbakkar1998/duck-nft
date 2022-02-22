import "./DuckCard.scss";
import { useEffect, useRef, useState } from "react";
import { useMachineStore } from "../../store";

const DuckCard = (props: any) => {
  const [flag, setFlag] = useState("block");
  const gridRow = useMachineStore((state) => state.gridRow);
  const currentDuckId = useMachineStore((state) => state.currentDuckId);
  const currentFilterVal = useMachineStore((state) => state.filterVal);
  const numberRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLHeadingElement>(null);
  const setCurrentDuckId = useMachineStore((state) => state.setCurrentDuckId);

  useEffect(() => {
    const itemObj = { ...props.attribute };
    switch (currentFilterVal) {
      case "available":
        setFlag("block");
        if (itemObj.owner !== null) {
          setFlag("none");
        }
        break;
      case "all":
        setFlag("block");
        break;
      case "custom":
        setFlag("block");
        if (!itemObj.isCustom) {
          setFlag("none");
        }
        break;
      case "sold":
        setFlag("block");
        if (!itemObj.owner) {
          setFlag("none");
        }
        break;
      default:
        break;
    }
  }, [currentFilterVal, props.attribute]);

  useEffect(() => {
    if (gridRow === "4x") {
      cardRef.current!.style.width = "25%";
      numberRef.current!.style.fontSize = "4em";
    } else {
      cardRef.current!.style.width = "33.3%";
      numberRef.current!.style.fontSize = "5em";
    }
  });

  return (
    <div
      ref={cardRef}
      className="DarkCard"
      style={{ display: flag }}
      onClick={() => setCurrentDuckId(parseInt(props.number))}
    >
      <div
        className="DarkCard__pic"
        style={{
          border:
            currentDuckId === props.number ? "10px solid #00fff3" : "unset",
        }}
      >
        <img alt="pic" src={props.img}></img>
      </div>
      <div ref={numberRef} className="DarkCard__number">
        {props.number && props.number.toString().padStart(3, '0')}
      </div>
    </div>
  );
};

export default DuckCard;
