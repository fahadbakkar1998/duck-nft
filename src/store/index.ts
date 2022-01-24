import create, { SetState, GetState } from 'zustand';

type MachineStore = {
    shopping: any;
    updateShopping: (value: any) => void;
    currentDuck: any;
    updateCurrentDuck: (value : any) => void;
    admin: any;
    updateAdmin: (value: any) => void;
};

export const useMachineStore = create<MachineStore>((set: SetState<MachineStore>) => ({
    shopping: 0,
    updateShopping: (value: any): void => {
        set({ shopping: value });
    },
    currentDuck: {
        letter: '',
        number: '',
    },
    updateCurrentDuck: (value: any) : void => {
        set({ currentDuck: value });
    },
    admin: true,
    updateAdmin: (value: any) : void => {
        set({ admin: value });
    }
}))

export default useMachineStore;