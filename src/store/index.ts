import create, { SetState } from "zustand";
import {
  MachineMode,
  defaultLayerIndex,
  defaultColorIndex,
  colors,
} from "../utils/constants";
import DTool from "./DTool";
import jsonDucks from "../utils/duck-data.json";
import { DuckData, DuckFilters } from "../types/types";

type MachineStore = {
  // main
  currentMode: MachineMode;
  switchModes: () => void;
  isSwitchingModes: boolean;
  setIsSwitchingModes: (isSwitching: boolean) => void;
  setCurrentMode: (val: MachineMode) => void;
  currentDuckId: number;
  setCurrentDuckId: (val: number) => void;
  currentAdminDuckId: number;
  setCurrentAdminDuckId: (val: number) => void;
  altIsStatic: boolean;
  changeChannel: (duration: number) => void;
  duckFilters: DuckFilters;
  setDuckFilters: (filters: DuckFilters) => void;

  // color picker
  DToolInst: DTool;
  selectedLayerIndex: number;
  setSelectedLayerIndex: (val: number) => void;
  selectedColorIndex: number;
  setSelectedColorIndex: (val: number) => void;
  selectedColor: string;
  setSelectedColor: (val: string) => void;
  selectedTool: number;
  setSelectedTool: (val: number) => void;
  historyButtonsState: any;
  setHistoryButtonsState: (val: any) => void;

  // contract data
  machineConfig: any;
  setMachineConfig: (val: any) => void;
  ducks: Array<DuckData>;
  setDucks: (val: Array<DuckData>) => void;

  // contract status
  processing: boolean;
  setProcessing: (val: boolean) => void;
  address: string;
  setAddress: (val: string) => void;
  transactionStatus: any;
  setTransactionStatus: (val: any) => void;
  showTxStatus: boolean;
  setShowTxStatus: (val: boolean) => void;

  // modal
  openBurnModal: boolean;
  setOpenBurnModal: (val: boolean) => void;

  // eyedropper
  eyeDropperColor: any;
  setEyeDropperColor: (val: boolean) => void;
};

export const useMachineStore = create<MachineStore>(
  (set: SetState<MachineStore>) => ({
    // main
    currentMode: MachineMode.Off,
    setCurrentMode: (mode: MachineMode): void => {
      set({ currentMode: mode });
    },

    altIsStatic: false,
    changeChannel: (duration): void => {
      set({ altIsStatic: true });
      setTimeout(() => {
        set({ altIsStatic: false });
      }, duration);
    },

    duckFilters: {
      all: true,
      available: true,
      sold: true,
      mine: true,
      custom: true,
      hideUI: false,
    },
    setDuckFilters: (filters: DuckFilters): void => {
      set({ duckFilters: filters });
    },

    setIsSwitchingModes: (isSwitching: boolean): void => {
      set({ isSwitchingModes: isSwitching });
    },
    isSwitchingModes: false,
    switchModes: (): void => {
      set((state) => {
        setTimeout(() => {
          set({ isSwitchingModes: false });
        }, 300);
        const currentMode = state.currentMode;
        let nextMode: any;
        switch (state.currentMode) {
          case MachineMode.Shopping:
            nextMode = MachineMode.Customization;
            break;
          case MachineMode.Customization:
            nextMode = MachineMode.Admin;
            break;
          case MachineMode.Admin:
            nextMode = MachineMode.Shopping;
            break;
          default:
            nextMode = currentMode;
        }
        return { currentMode: nextMode, isSwitchingModes: true };
      });
    },

    currentDuckId: 0,
    setCurrentDuckId: (id: number): void => {
      set((state) => {
        state.changeChannel(250);
        return { currentDuckId: id };
      });
    },

    currentAdminDuckId: -1,
    setCurrentAdminDuckId: (id: number): void => {
      set({ currentAdminDuckId: id });
    },

    // color picker
    DToolInst: new DTool(2, 40),

    selectedLayerIndex: defaultLayerIndex,
    setSelectedLayerIndex: (val: number): void => {
      set({ selectedLayerIndex: val });
    },

    selectedColorIndex: defaultColorIndex,
    setSelectedColorIndex: (val: number): void => {
      set({ selectedColorIndex: val });
    },

    selectedColor: colors[defaultLayerIndex],
    setSelectedColor: (val: string): void => {
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

    // contract data
    machineConfig: {
      tozziDuckPrice: 0,
      customDuckPrice: 0,
      maxCustomDucks: 0,
      tozziDuckMintStatus: 0,
      customDuckMintStatus: 0,
      balance: 0,
      burnWindow: 0,
      owner: "",
    },
    setMachineConfig: (val: any): void => {
      set({ machineConfig: val });
    },

    ducks: jsonDucks,
    setDucks: (val: Array<DuckData>): void => {
      set({ ducks: val });
    },

    // contract status
    processing: false,
    setProcessing: (val: boolean): void => {
      set({ processing: val });
    },

    address: "",
    setAddress: (val: string): void => {
      set({ address: val });
    },

    transactionStatus: "",
    setTransactionStatus: (val: any): void => {
      set({ transactionStatus: val });
    },

    showTxStatus: false,
    setShowTxStatus: (val: boolean): void => {
      set({ showTxStatus: val });
    },

    // modal
    openBurnModal: false,
    setOpenBurnModal: (val: boolean): void => {
      set({ openBurnModal: val });
    },

    // eyedropper
    eyeDropperColor: { r: 0, g: 0, b: 0 },
    setEyeDropperColor: (eyeDropperColor: boolean): void => {
      set({ eyeDropperColor });
    },
  })
);

export default useMachineStore;
