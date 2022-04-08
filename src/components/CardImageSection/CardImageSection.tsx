import { useRef, useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import DuckCard from "../DuckCard/DuckCard";
import useMachineStore from "../../store";
import "./CardImageSection.scss";
import Footer from "./Footer";


const CardImageSection = (props: any) => {  
  const tozziDuckData = useMachineStore((state) => state.tozziDuckData);
  const [isHovered, setIsHovered] = useState(false);
  const [filterTozziDuckData] =
  useState<any>(tozziDuckData);
  const [filterCustomDuckData] = useState<any>([]);

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
          style={{ overflow: isHovered ? 'scroll' : 'hidden' }}
          id="mainScreen"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            style={{ borderRadius: '15%' }} 
            className="pointer-events-none absolute w-full  z-30  inner-shadow border-radius h-full" />
                    
          <div className="relative w-full h-full">
            
            <div className="grid grid-cols-3  gap-1 relative">
              
              {filterTozziDuckData.map((item: any) => {
                let img = require(`../../assets/img/ducks/crypto_duck_${
                  parseInt(item.id) + 1
                }.svg`);              
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
        </div>
        {/* <Footer /> */}
      </div>
    </Html>
  );
};

export default CardImageSection;
