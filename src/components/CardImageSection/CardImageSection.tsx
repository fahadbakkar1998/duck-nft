import { useRef } from "react";
import { Html } from "@react-three/drei";
import DuckCard from "../DuckCard/DuckCard";
import duckData from "../../utils/duck-data.json";
import "./style.scss";

const CardImageSection = (props: any) => {
  const mainScreen = useRef<HTMLDivElement>(null);

  const setOverflow = (flag: any) => {
    flag
      ? (mainScreen.current!.style!.overflow = "auto")
      : (mainScreen.current!.style!.overflow = "hidden");
  };

  return (
    <Html
      style={{ pointerEvents: "auto" }}
      distanceFactor={2.4}
      position={props.isFront ? [0.0, 0.1, 0.0] : [0.0, -0.1, 0.0]}
      rotation={
        props.isFront
          ? [Math.PI / 2, Math.PI, Math.PI / 2]
          : [Math.PI / 2, -Math.PI * 2, Math.PI / 2]
      }
      transform
      occlude
    >
      <div className="main">
        <div
          className="mainScreen"
          ref={mainScreen}
          id="mainScreen"
          onMouseEnter={() => setOverflow(true)}
          onMouseLeave={() => setOverflow(false)}
        >
          <div className="imgContainer scanlines">
            {duckData.map((item: any, index: any) => {
              let img = require(`../../assets/img/ducks/crypto_duck_${item.id}.svg`);
              return (
                <DuckCard
                  key={item.id}
                  img={img}
                  number={item.id}
                  attribute={item}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Html>
  );
};

export default CardImageSection;
