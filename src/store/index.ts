import create, { SetState } from 'zustand';
import { QueryClient } from 'react-query';
import { emptyDuckData, MachineMode } from '../utils/constants';
import { AltMessage, DuckData, DuckFilters } from '../types/types';
import proofs from '../data/proofs.json';
import { fetchDucks, contract } from '../utils/functions';
import { filterDucks } from '../utils/helpers';

const staticDuckData: DuckData[] = Object.values(proofs).map((proof, index) => {
  return { id: index, ...proof, ...emptyDuckData };
});

type MachineStore = {
  ducks: DuckData[];
  setDucks: (ducks: DuckData[]) => void;
  burnableDucks: DuckData[];
  filteredDucks: DuckData[];

  account: string | undefined | null;
  setAccount: (account: string | undefined | null) => void;

  currentMode: MachineMode;
  switchModes: (direction: string) => void;
  queryClient: any;
  isSwitchingModes: boolean;
  setIsSwitchingModes: (isSwitching: boolean) => void;
  setCurrentMode: (val: MachineMode) => void;
  currentDuckId: number;
  setCurrentDuckId: (val: number) => void;
  currentAdminDuckId: number;
  setCurrentAdminDuckId: (val: number) => void;
  machineMood: undefined | 'happy' | 'sad';
  setMachineMood: (mood: undefined | 'happy' | 'sad') => void;
  isLocked: boolean;
  setIsLocked: (locked: boolean) => void;
  changeChannel: (duration: number) => void;
  duckFilters: DuckFilters;
  setDuckFilters: (filters: DuckFilters) => void;
  showDuckIdOnDuckCards: boolean;
  setShowDuckIdOnDuckCards: (val: boolean) => void
  showAvailabilityOnDuckCards: boolean;
  setShowAvailabilityOnDuckCards: (val: boolean) => void

  // alt screen
  altIsStatic: boolean;
  showDuckProfile: boolean;
  setShowDuckProfile: (showProfile: boolean) => void;
  altMessage: AltMessage | undefined;
  setAltMessage: (message: string | AltMessage | undefined) => void;

  // contract data
  machineConfig: any;
  setMachineConfig: (val: any) => void;

  // modal
  openBurnForm: boolean;
  setOpenBurnForm: (val: boolean) => void;
  isOwnersManualOpen: boolean;
  setIsOwnersManualOpen: (val: boolean) => void;
  showMotd: boolean;
  setShowMotd: (val: boolean) => void;
  showProfileForm: boolean;
  setShowProfileForm: (val: boolean) => void;

  processing: boolean;
  setProcessing: (val: boolean) => void;
  address: string;
  setAddress: (val: string) => void;
  transactionStatus: any;
  setTransactionStatus: (val: any) => void;
  showTxStatus: boolean;
  setShowTxStatus: (val: boolean) => void;

  newDuck: number | undefined;
  setNewDuck: (newDuck: number | undefined) => void;
};

export const useMachineStore = create<MachineStore>(
  (set: SetState<MachineStore>) => ({

    ducks: [],
    burnableDucks: [],
    filteredDucks: [],
    setDucks: (ducks: DuckData[]): void => {
      set((state) => ({
        ducks,
        burnableDucks: ducks.filter((d) => d.burnable),
      }));
    },

    account: undefined,
    setAccount: (account: string | undefined | null): void => {
      set({ account });
    },
    // main
    currentMode: MachineMode.Off,
    setCurrentMode: (mode: MachineMode): void => {
      set({ currentMode: mode });
    },
    machineMood: undefined,
    setMachineMood: (mood: undefined | 'happy' | 'sad'):void => {
      set({ machineMood: mood });
    },

    isLocked: false,
    setIsLocked: (locked: boolean): void => {
      if (!locked) {
        set({ isLocked: locked, showProfileForm: false });
        return;
      }
      set({ isLocked: locked });
    },
    // alt screen
    queryClient: new QueryClient(),

    altIsStatic: false,
    changeChannel: (duration): void => {
      set({ altIsStatic: true });
      setTimeout(() => {
        set({ altIsStatic: false });
      }, duration);
    },

    showDuckProfile: false,
    setShowDuckProfile: (showProfile: boolean): void => {
      if (showProfile === false) {
        set({ showDuckProfile: showProfile, showProfileForm: false });
      } else {
        set({ showDuckProfile: showProfile });
      }
    },

    altMessage: undefined,
    setAltMessage: (message: string | AltMessage | undefined): void => {
      if (typeof message === 'string') {
        set({ altMessage: { message } });
        return;
      }
      set({ altMessage: message });
    },
    duckFilters: {
      available: true,
      sold: true,
      mine: false,
      custom: false,
      hideUI: false,
    },
    setDuckFilters: (filters: DuckFilters): void => {
      set((state) => ({
        duckFilters: filters,
        filteredDucks: filterDucks({ ducks: state.ducks, filters, account: state.account }),
      }));
    },
    showAvailabilityOnDuckCards: true,
    setShowAvailabilityOnDuckCards: (show: boolean): void => {
      set({ showAvailabilityOnDuckCards: show });
    },
    showDuckIdOnDuckCards: true,
    setShowDuckIdOnDuckCards: (show: boolean): void => {
      set({ showDuckIdOnDuckCards: show });
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
        if (direction === 'off') {
          return { currentMode: MachineMode.Off, isSwitchingModes: true, altMessage: undefined };
        }
        if (direction === 'shopping') {
          return { currentMode: MachineMode.Shopping, isSwitchingModes: true, altMessage: undefined };
        }
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
            nextMode = MachineMode.Shopping;
        }
        return { currentMode: nextMode, isSwitchingModes: true, altMessage: undefined };
      });
    },
    currentDuckId: 0,
    setCurrentDuckId: (id: number): void => {
      set((state) => {
        state.changeChannel(250);
        setTimeout(() => {
          set({ machineMood: undefined, altIsStatic: false });
        }, 350);
        return { showDuckProfile: false, showProfileForm: false, currentDuckId: id };
      });
    },

    currentAdminDuckId: -1,
    setCurrentAdminDuckId: (id: number): void => {
      set((state) => {
        state.changeChannel(250);
        setTimeout(() => {
          set({ machineMood: undefined, altIsStatic: false });
        }, 350);
        return { currentAdminDuckId: id };
      });
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
      owner: '',
    },
    setMachineConfig: (val: any): void => {
      set({ machineConfig: val });
    },

    // modal
    openBurnForm: false,
    setOpenBurnForm: (val: boolean): void => {
      set({ openBurnForm: val });
    },
    isOwnersManualOpen: false,
    setIsOwnersManualOpen: (val: boolean): void => {
      set({ isOwnersManualOpen: val });
    },
    showMotd: true,
    setShowMotd: (val: boolean): void => {
      set({ showMotd: val });
    },

    showProfileForm: false,
    setShowProfileForm: (val: boolean): void => {
      set({ showProfileForm: val });
    },

    // contract status
    processing: false,
    setProcessing: (val: boolean): void => {
      set({ processing: val });
    },

    address: '',
    setAddress: (val: string): void => {
      set({ address: val });
    },

    transactionStatus: '',
    setTransactionStatus: (val: any): void => {
      set({ transactionStatus: val });
    },

    showTxStatus: false,
    setShowTxStatus: (val: boolean): void => {
      set({ showTxStatus: val });
    },

    newDuck: undefined,
    setNewDuck: (newDuck: number | undefined) => {
      set({ newDuck });
    },
  }),
);

const refreshDucks = () => {
  fetchDucks()
    .then((ducks) => {
      useMachineStore.setState((state) => ({
        ...state,
        ducks,
        burnableDucks: ducks.filter((d) => d.burnable),
        filteredDucks: filterDucks({ ducks, filters: state.duckFilters, account: state.account }),
      }));
    });
};

refreshDucks();

const events = [
  'CustomDuckBurned',
  'DuckMinted',
  'DuckProfileUpdated',
  'DuckTitleGranted',
];

events.forEach((event) => {
  contract.on(event, () => {
    // eslint-disable-next-line no-console
    refreshDucks();
  });
});

export default useMachineStore;
