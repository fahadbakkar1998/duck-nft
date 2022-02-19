import "./DuckCard.scss";
import { useEffect, useRef, useState } from "react";
import { useScreenStore } from "../store";
import { useMachineStore } from "../../store";
import { displayPartsToString } from "typescript";

const DuckCard = (props: any) => {
  const [flag, setFlag] = useState("block");
  const currentGrid = useScreenStore((state) => state.gridRow);

  const currentDuck = useScreenStore((state) => state.currentDuck);

  const currentFilterVal = useScreenStore((state) => state.filterVal);

  const updateCurrentDuck = useScreenStore((state) => state.updateCurrentDuck);

  const numberRef = useRef<HTMLHeadingElement>(null);

  const cardImages__item = useRef<HTMLHeadingElement>(null);

  const setCurrentDuckID = useMachineStore((state) => state.setCurrentDuckID);

  const isSelected = () => currentDuck.number === myNumber;

  const clickAction = () => {
    setCurrentDuckID(parseInt(myNumber));
    updateCurrentDuck({ number: myNumber });
  };
  const itemObj = { ...props.attribute };
  useEffect(() => {
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

      /////////////////////my duck///////////////////
      // case 'myDuck':
      //     setFlag('block');
      //     if(itemObj.owner == currentUser){
      //         setFlag('none');
      //     }
      //     break;
      default:
        break;
    }
  }, [currentFilterVal]);

  useEffect(() => {
    if (currentGrid == "4x") {
      cardImages__item.current!.style.width = "25%";
      numberRef.current!.style.fontSize = "4em";
    } else {
      cardImages__item.current!.style.width = "33.3%";
      numberRef.current!.style.fontSize = "5em";
    }
  });

  const transformNumber = (num: any) =>
    num.length === 1 ? "00" + num : num.length === 2 ? "0" + num : num;

  const myNumber = transformNumber(props.number + "");

  return (
    <div
      ref={cardImages__item}
      id={`card_${myNumber}`}
      className="cardImages__item"
      style={{
        display: flag,
        //  zIndex: isSelected() ? 100 : 1,
      }}
      onClick={clickAction}
    >
      <div
        className="cardImages__item__pic"
        style={{
          border: isSelected() ? "10px solid #00fff3" : "unset",
        }}
      >
        <img alt="pic" src={props.img}></img>
      </div>
      <div ref={numberRef} className="cardImages__item__number">
        {myNumber}
      </div>
    </div>
  );
};

export default DuckCard;
