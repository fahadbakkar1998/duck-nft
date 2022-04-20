import { useRef, useState, useEffect } from "react";
import DuckCard from "../../../DuckCard/DuckCard";
import useMachineStore from "../../../../store";
import { MachineMode } from "../../../../utils/constants";
import "./index.scss";
import Modal from "../Modal";
import FiltersModal from "./FiltersModal";
import cn from "classnames";

const HomeScreen = (props: any) => {
  const { ducks, isSwitchingModes, currentMode } = useMachineStore();
  const [showFilters, setShowFilters] = useState(false);
  const [filterTozziDuckData] = useState<any>(ducks);
  const [filterCustomDuckData] = useState<any>([]);

  return (
    <div
      className={cn("main", {
        active: currentMode === MachineMode.Shopping,
      })}
    >
      <div className={cn("mainScreen overflow-scroll w-full")}>
        <FiltersModal
          open={showFilters}
          onClose={() => {
            setShowFilters(false);
          }}
        />
        {!isSwitchingModes && (
          <>
            <div
              style={{ borderRadius: "15%" }}
              className="pointer-events-none absolute w-full  z-30  inner-shadow h-full"
            />

            <div className="absolute -bottom-14 left-0 w-full flex justify-center">
              <div
                onClick={() => {
                  setShowFilters(true);
                }}
                className="bg-red-500 p-2 cursor-pointer"
              >
                FILTERS
              </div>
            </div>

            {/* DUCK GRID   */}
            <div
              className={cn("relative w-full h-full duck-grid", {
                overflow:
                  !isSwitchingModes && currentMode === MachineMode.Shopping,
              })}
            >
              <div className="grid grid-cols-3 gap-1">
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
          </>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
