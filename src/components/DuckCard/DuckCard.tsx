import "./DuckCard.scss";
import { useRef } from "react";
import { useMachineStore } from "../../store";
import { tozziDuckNum } from "../../utils/constants";

const DuckCard = (props: any) => {
  const tozziDuckData = useMachineStore((state) => state.tozziDuckData);
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

  return props.isCustom ? (
    <div
      ref={cardRef}
      className="DarkCard"
      onClick={() => {
        setCurrentTozziDuckId(-1);
        setCurrentCustomDuckId(parseInt(props.data.id));
      }}
    >
      <div
        className="DarkCard__pic"
        style={{
          border:
            currentCustomDuckId === props.data.id
              ? "10px solid #00fff3"
              : "unset",
        }}
      >
        <img alt="" src={props.img}></img>
      </div>
      <div className="DarkCard__content">
        <div ref={numberRef} className="DarkCard__number">
          {props.data.id && props.data.id.toString().padStart(3, "0")}
        </div>
        <div className="DarkCard__status">
          {customDuckData[parseInt(props.data.id) - tozziDuckNum].owner &&
            "SOLD"}
        </div>
      </div>
    </div>
  ) : (
    <div
      ref={cardRef}
      className="DarkCard"
      onClick={() => {
        setCurrentTozziDuckId(parseInt(props.data.id));
        setCurrentCustomDuckId(-1);
      }}
    >
      <div
        className="DarkCard__pic"
        style={{
          border:
            currentTozziDuckId === props.data.id
              ? "10px solid #00fff3"
              : "unset",
        }}
      >
        <img alt="pic" src={props.img}></img>
      </div>
      <div className="DarkCard__content">
        <div ref={numberRef} className="DarkCard__number">
          {props.data.id.toString().padStart(3, "0")}
        </div>
        <div className="DarkCard__status">
          {!!tozziDuckData[parseInt(props.data.id)].owner && "SOLD"}
        </div>
      </div>
    </div>
  );
};

export default DuckCard;
