import create, { SetState, GetState } from 'zustand';

type ScreenStore = {
    gridRow: any;
    updateGridRow: (value: any) => void;
    currentDuck: any;
    updateCurrentDuck: (value : any) => void;
    filterVal : any;
    updateFilterVal : (value : any) => void;
};


export const useScreenStore = create<ScreenStore>((set: SetState<ScreenStore>) => ({
    gridRow: '3x',
    updateGridRow: (value: any): void => {
        set({ gridRow: value });
    },
    currentDuck: {
        number: '',
    },
    updateCurrentDuck: (value: any) : void => {
        set({ currentDuck: value });
    },
    filterVal : {
        string : '',
    },
    updateFilterVal : (value : any) : void =>{
        set({ filterVal : value});
    }
}))
