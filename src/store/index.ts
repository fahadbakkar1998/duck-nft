import create, { SetState } from "zustand";
import {
  MachineMode,
  defaultLayerIndex,
  defaultColorIndex,
  colors,
} from "../utils/constants";
import DTool from "./DTool";
import ducks from "../utils/duck-data.json";

type MachineStore = {
  // main
  currentMode: MachineMode;
  setCurrentMode: (val: MachineMode) => void;
  currentTozziDuckId: number;
  setCurrentTozziDuckId: (val: number) => void;
  currentCustomDuckId: number;
  setCurrentCustomDuckId: (val: number) => void;
  currentAdminDuckId: number;
  setCurrentAdminDuckId: (val: number) => void;

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

  // contract
  machineSetting: any;
  setMachineSetting: (val: any) => void;
  tozziDuckData: Array<any>;
  setTozziDuckData: (val: Array<any>) => void;
  customDuckData: Array<any>;
  setCustomDuckData: (val: Array<any>) => void;

  // contract
  syncing: boolean; // for wallet connection
  setSyncing: (val: boolean) => void; // for wallet connection
  processing: boolean;
  setProcessing: (val: boolean) => void;
  address: string | null;
  setAddress: (val: string | null) => void;
  transactionStatus: any;
  setTransactionStatus: (val: any) => void;
  showTxStatus: boolean;
  setShowTxStatus: (val: boolean) => void;

  // modal
  openBurnModal: boolean;
  setOpenBurnModal: (val: boolean) => void;

  eyeDropperColor: any;
  setEyeDropperColor: (val: boolean) => void;
};

export const useMachineStore = create<MachineStore>(
  (set: SetState<MachineStore>) => ({
    // main
    currentMode: MachineMode.Shopping,
    setCurrentMode: (mode: MachineMode): void => {
      set({ currentMode: mode });
    },

    currentTozziDuckId: -1,
    setCurrentTozziDuckId: (id: number): void => {
      set({ currentTozziDuckId: id });
    },

    currentCustomDuckId: -1,
    setCurrentCustomDuckId: (id: number): void => {
      set({ currentCustomDuckId: id });
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

    // duck data
    machineSetting: {},
    setMachineSetting: (val: any): void => {
      set({ machineSetting: val });
    },

    // duck data
    tozziDuckData: ducks,
    setTozziDuckData: (val: Array<any>): void => {
      set({ tozziDuckData: val });
    },

    customDuckData: [],
    setCustomDuckData: (val: Array<any>): void => {
      set({ customDuckData: val });
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

    eyeDropperColor: { r: 0, g: 0, b: 0 },
    setEyeDropperColor: (eyeDropperColor: boolean): void => {
      set({ eyeDropperColor });
    },
  })
);

export default useMachineStore;
