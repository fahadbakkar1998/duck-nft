import create, { SetState } from "zustand";
import { MachineMode } from "../utils/types";

const defaultLayerIndex = 0;
const defaultColorIndex = 0;

type MachineStore = {
  currentMode: MachineMode;
  setCurrentMode: (mode: MachineMode) => void;
  currentDuckId: number;
  setCurrentDuckId: (id: number) => void;
  gridRow: any;
  updateGridRow: (value: any) => void;
  filterVal: any;
  updateFilterVal: (value: any) => void;
};

export const useMachineStore = create<MachineStore>(
  (set: SetState<MachineStore>) => ({
    // main
    currentMode: MachineMode.Shopping,
    setCurrentMode: (mode: MachineMode): void => {
      set({ currentMode: mode });
    },
    currentDuckId: 1,
    setCurrentDuckId: (id: number): void => {
      set({ currentDuckId: id });
    },
    gridRow: "3x",
    updateGridRow: (value: any): void => {
      set({ gridRow: value });
    },
    filterVal: {
      string: "",
    },
    updateFilterVal: (value: any): void => {
      set({ filterVal: value });
    },

    // color picker
  })
);

export default useMachineStore;
