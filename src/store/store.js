import { create } from "zustand";

const useUserState = create((set) => ({
  id: "",
  userMoney: 0,
  tableChips: 0,
  setUser: (id, money) => set({ id: id, userMoney: money }),
  setTableChips: (chips) =>
    set((state) => ({ userMoney: state.userMoney - chips, tableChips: chips })),
  returnChipsToTotal: () =>
    set((state) => ({
      userMoney: state.userMoney + state.tableChips,
      tableChips: 0,
    })),
  resetUser: () =>
    set({
      id: "",
      userMoney: 0,
      tableChips: 0,
    }),
}));

export default useUserState;
