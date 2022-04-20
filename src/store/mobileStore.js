import create from "zustand";

export const useMobileStore = create((set) => ({
  isOpenDuckModal: false,
  setIsOpenDuckModal: (flag) => {
    set({ isOpenDuckModal: flag });
  },

  curDuckId: 0,
  setCurDuckId: (curDuckId) => {
    set({ curDuckId });
  },
}));

export default useMobileStore;
