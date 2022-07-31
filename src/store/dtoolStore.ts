import create, { SetState } from 'zustand';
import { QueryClient } from 'react-query';
import {
  MachineMode,
  defaultLayerIndex,
  defaultColorIndex,
  colors,
} from '../utils/constants';
import DTool from './DTool';

type DToolStore = {
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
  eyeDropperColor: any;
  setEyeDropperColor: (val: boolean) => void;
};

export const useDToolStore = create<DToolStore>(
  (set: SetState<DToolStore>) => ({
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
    eyeDropperColor: { r: 0, g: 0, b: 0 },
    setEyeDropperColor: (eyeDropperColor: boolean): void => {
      set({ eyeDropperColor });
    },
  }),
);
