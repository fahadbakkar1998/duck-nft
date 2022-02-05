import create, { SetState, GetState } from 'zustand';
import { MachineMode } from "../types/types";



type MachineStore = {
    currentMode: MachineMode;
    setCurrentMode: (mode: MachineMode) => void;
    currentDuckID: number;
    setCurrentDuckID: (id: number) => void;
    currentMachineMode: number;
    setCurrentMachineMode: (id: number) => void;
};


export const useMachineStore = create<MachineStore>((set: SetState<MachineStore>) => ({
    currentMode: 0,
    setCurrentMode: (mode: MachineMode): void => {
        set({currentMode: mode});
    },
    currentDuckID: 0,
    setCurrentDuckID: (id:number) : void => {
        set({ currentDuckID: id});
    },
    currentMachineMode: 0,
    setCurrentMachineMode: (id:number) : void => {
        set({ currentMachineMode: id});
    }
}))

export default useMachineStore;