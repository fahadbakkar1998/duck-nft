import { useRef, useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import DuckCard from "../DuckCard/DuckCard";
import useMachineStore from "../../store";
import "./BrowsingScreen.scss";


const HomeScreen = (props: any) => {  
  const tozziDuckData = useMachineStore((state) => state.tozziDuckData);  
  const [filterTozziDuckData] =
  useState<any>(tozziDuckData);
  const [filterCustomDuckData] = useState<any>([]);

  return (
    <div className="main">
    
      <div                        
        className={`mainScreen overflow-scroll w-full`}        
      >
        <div 
          style={{ borderRadius: '15%' }} 
          className="pointer-events-none absolute w-full  z-30  inner-shadow border-radius h-full" />
                  
        <div className="relative w-full h-full">
          
          <div className="grid grid-cols-3 gap-1 relative">
            
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
    </div>    
  );
};

export default HomeScreen;
