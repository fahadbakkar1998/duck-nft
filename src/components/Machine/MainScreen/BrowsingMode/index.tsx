import React, { useState } from "react";
import DuckCard from "../../../DuckCard/DuckCard";
import useMachineStore from "../../../../store";
import { MachineMode } from "../../../../utils/constants";
import "./index.scss";
import FiltersModal from "./FiltersModal";
import cn from "classnames";
import { useFilteredDucks } from "../../../../hooks";
import { DuckData } from "../../../../types/types";

const HomeScreen = () => {
  const { isSwitchingModes, currentMode } = useMachineStore();
  const [showFilters, setShowFilters] = useState(false);
  const filteredDucks = useFilteredDucks();

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
              className="absolute z-30 w-full h-full pointer-events-none inner-shadow"
            />

            <div className="absolute left-0 flex justify-center w-full -bottom-14">
              <div
                onClick={() => {
                  setShowFilters(true);
                }}
                className="p-2 bg-red-500 cursor-pointer"
              >
                FILTERS
              </div>
            </div>

            {/* DUCK GRID */}
            <div
              className={cn("relative w-full h-full duck-grid", {
                overflow:
                  !isSwitchingModes && currentMode === MachineMode.Shopping,
              })}
            >
              <div className="grid grid-cols-3 gap-1">
                {React.Children.toArray(
                  filteredDucks.map((item: DuckData) => {
                    return <DuckCard {...item} />;
                  })
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
