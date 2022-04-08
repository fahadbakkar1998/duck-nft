import { useRef, useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import DuckCard from "../DuckCard/DuckCard";
import useMachineStore from "../../store";
import "./CardImageSection.scss";
import Footer from "./Footer";


const CardImageSection = (props: any) => {
  const mainScreen = useRef<HTMLDivElement>(null);
  const tozziDuckData = useMachineStore((state) => state.tozziDuckData);

  const setOverflow = (flag: any) => {
    flag
      ? (mainScreen.current!.style!.overflow = "auto")
      : (mainScreen.current!.style!.overflow = "hidden");
  };

  const [filterTozziDuckData, setFilterTozziDuckData] =
  useState<any>(tozziDuckData);
  const [filterCustomDuckData, setFilterCustomDuckData] = useState<any>([]);

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
            {filterTozziDuckData.map((item: any) => {
              let img = require(`../../assets/img/ducks/crypto_duck_${
                parseInt(item.id) + 1
              }.svg`);
              // console.log("image object: ", img);
              return <DuckCard key={item.id} img={img} data={item} />;
            })}
            {filterCustomDuckData.map((item: any) => {
              return (
                <DuckCard
                  key={item.id}
                  img={item.image}
                  data={item}
                  isCustom={true}
                />
              );
            })}
          </div>
        </div>
        <Footer />
      </div>
    </Html>
  );
};

export default CardImageSection;
