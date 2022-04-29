import React, { useState } from "react";
import DuckCard from "../../../DuckCard/DuckCard";
import useMachineStore from "../../../../store";
import { MachineMode } from "../../../../utils/constants";
import "./index.scss";
import FiltersModal from "./FiltersModal";
import cn from "classnames";
import { useFilteredDucks } from "../../../../hooks";
import { DuckData } from "../../../../types/types";
import CircleButton from "../../../../components/common/CircleButton";
import filterIcon from "../../../../assets/img/icons/filter.svg";
import PillButton from "@/components/common/ModeSwitcher";

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
      <div className={cn("mainScreen overflow-scroll w-full border-gray-600 border-2")}>
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
            
            <div className="right">
              <CircleButton
                onClick={() => {
                  setShowFilters(!showFilters);
                }}
                image={filterIcon}
              />
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
