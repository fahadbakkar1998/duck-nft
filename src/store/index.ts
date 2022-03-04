import create, { SetState } from "zustand";
import {
  MachineMode,
  defaultLayerIndex,
  defaultColorIndex,
  colors,
} from "../utils/constants";
import DTool from "./DTool";
import { Duck } from "../types/types";
import ducks from "../utils/duck-data.json";

type MachineStore = {
  // main
  currentMode: MachineMode;
  setCurrentMode: (val: MachineMode) => void;
  currentDuckId: number;
  setCurrentDuckId: (val: number) => void;
  gridRow: string | null;
  updateGridRow: (val: string | null) => void;
  filterVal: any;
  updateFilterVal: (val: any) => void;

  // color picker
  DToolInst: DTool;
  selectedLayerIndex: number;
  setSelectedLayerIndex: (val: number) => void;
  selectedColorIndex: number;
  setSelectedColorIndex: (val: number) => void;
  selectedColor: string | null;
  setSelectedColor: (val: string | null) => void;
  selectedTool: number;
  setSelectedTool: (val: number) => void;
  historyButtonsState: any;
  setHistoryButtonsState: (val: any) => void;
  customStep: number;
  setCustomStep: (val: number) => void;

  // duck data
  duckData: Array<Duck>;
  setDuckData: (val: Array<Duck>) => void;

  // contract
  syncing: boolean; // for wallet connection
  setSyncing: (val: boolean) => void; // for wallet connection
  processing: boolean;
  setProcessing: (val: boolean) => void;
  address: string | null;
  setAddress: (val: string | null) => void;
};

export const useMachineStore = create<MachineStore>(
  (set: SetState<MachineStore>) => ({
    // main
    currentMode: MachineMode.Shopping,
    setCurrentMode: (mode: MachineMode): void => {
      set({ currentMode: mode });
    },

    currentDuckId: 0,
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
    DToolInst: new DTool(10, 40),

    selectedLayerIndex: defaultLayerIndex,
    setSelectedLayerIndex: (val: number): void => {
      set({ selectedLayerIndex: val });
    },

    selectedColorIndex: defaultColorIndex,
    setSelectedColorIndex: (val: number): void => {
      set({ selectedColorIndex: val });
    },

    selectedColor: colors[defaultLayerIndex],
    setSelectedColor: (val: string | null): void => {
      set({ selectedColor: val });
    },

    selectedTool: 0,
    setSelectedTool: (val: number): void => {
      set({ selectedTool: val });
    },

    historyButtonsState: [false, false],
    setHistoryButtonsState: (val: any): void => {
      set({ historyButtonsState: val });
    },

    customStep: 0,
    setCustomStep: (val: number): void => {
      set({ customStep: val });
    },

    // duck data
    duckData: ducks,
    setDuckData: (val: Array<Duck>): void => {
      set({ duckData: val });
    },

    // contract
    syncing: false,
    setSyncing: (val: boolean): void => {
      set({ syncing: val });
    },

    processing: false,
    setProcessing: (val: boolean): void => {
      set({ processing: val });
    },

    address: "",
    setAddress: (val: string | null): void => {
      set({ address: val });
    },
  })
);

export default useMachineStore;
