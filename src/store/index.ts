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
  switchModes: (direction: string) => void;
  isSwitchingModes: boolean;
  setIsSwitchingModes: (isSwitching: boolean) => void;
  setCurrentMode: (val: MachineMode) => void;
  currentDuckId: number;
  setCurrentDuckId: (val: number) => void;
  currentAdminDuckId: number;
  setCurrentAdminDuckId: (val: number) => void;
  machineMood: undefined | 'happy' | 'sad';
  setMachineMood: (mood: undefined | 'happy' | 'sad') => void;
  
  changeChannel: (duration: number) => void;
  duckFilters: DuckFilters;
  setDuckFilters: (filters: DuckFilters) => void;

  // alt screen
  altIsStatic: boolean;
  showDuckProfile: boolean;
  setShowDuckProfile: (showProfile: boolean) => void;

  // color picker
  DToolInst: DTool;
  selectedLayerIndex: number;
  setSelectedLayerIndex: (val: number) => void;
  selectedColorIndex: number;
  setSelectedColorIndex: (val: number) => void;
  selectedColor: string;
  setSelectedColor: (val: string) => void;
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
  isOwnersManalOpen: boolean;
  setIsOwnersManualOpen: (val: boolean) => void;

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
    machineMood: undefined,
    setMachineMood: (mood: undefined | 'happy' | 'sad'):void => {
      set({ machineMood: mood});
    },
    // alt screen
    altIsStatic: false,
    changeChannel: (duration): void => {
      set({ altIsStatic: true });
      setTimeout(() => {
        set({ altIsStatic: false });
      }, duration);
    },

    showDuckProfile: false,
    setShowDuckProfile: (showProfile: boolean): void => {
      set({ showDuckProfile: showProfile });
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
    switchModes: (direction: string): void => {
      set((state) => {
        setTimeout(() => {
          set({ isSwitchingModes: false });
        }, 300);
        const currentMode = state.currentMode;
        let nextMode: any;
        switch (state.currentMode) {
          case MachineMode.Shopping:
            nextMode = direction === 'next' 
              ? MachineMode.Customization
              : MachineMode.Admin;
            break;
          case MachineMode.Customization:
            nextMode = direction === 'next' 
              ? MachineMode.Admin
              : MachineMode.Shopping;
            break;
          case MachineMode.Admin:
            nextMode = direction === 'next' 
              ? MachineMode.Shopping 
              : MachineMode.Customization;
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
        let duckSold = false;
        if (state.ducks[id].owner) duckSold = true;        
        setTimeout(() => {
          set({ machineMood: undefined, altIsStatic: false });
        }, 350);
        return { machineMood: duckSold ? 'sad' : 'happy', showDuckProfile: false, currentDuckId: id };
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
    isOwnersManalOpen: false,
    setIsOwnersManualOpen:  (val: boolean): void => {
      set({ isOwnersManalOpen: val });
    },

    // eyedropper
    eyeDropperColor: { r: 0, g: 0, b: 0 },
    setEyeDropperColor: (eyeDropperColor: boolean): void => {
      set({ eyeDropperColor });
    },
  })
);

export default useMachineStore;
