import { useRef, useState, useEffect } from "react";
import DuckCard from "../../../DuckCard/DuckCard";
import useMachineStore from "../../../../store";
import "./index.scss";
import { MachineMode } from "../../../../utils/constants";
import { DuckData } from "../../../../types/types";
import cn from "classnames";

const HomeScreen = (props: any) => {
  const currentState = useMachineStore((state) => state);
  const { currentMode, ducks } = currentState;
  const [filterTozziDuckData] = useState<any>(ducks);
  const [filterCustomDuckData] = useState<any>([]);

  return (
    <div
      className={cn("main", { active: currentMode === MachineMode.Shopping })}
    >
      <div className={`mainScreen overflow-scroll w-full`}>
        <div
          style={{ borderRadius: "15%" }}
          className="pointer-events-none absolute w-full  z-30  inner-shadow border-radius h-full"
        />

        <div className="relative w-full h-full">
          <div className="grid grid-cols-3 gap-1 relative">
            {filterTozziDuckData.map((item: any) => {
              let img = require(`../../../../assets/img/ducks/crypto_duck_${
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
