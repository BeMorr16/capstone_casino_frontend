import { create } from "zustand";

const useUserState = create((set) => ({
    id: "",
    userMoney: 0,
    tableChips: 0,
    isLoggedIn: false,
    setUser: (id, money) => set({id: id, userMoney: money}),
    setTableChips: (chips) => set((state) => ({ userMoney: state.userMoney - chips, tableChips: chips })),
    adjustTableChips: (chips) => set((state) => ({tableChips: state.tableChips + chips})),
    returnChipsToTotal: () => set((state) => ({ userMoney: state.userMoney + state.tableChips, tableChips: 0 })),
    setIsLoggedIn: (bool) => set({isLoggedIn: bool}),
    resetUser: () => set({
        id: "",
        userMoney: 0,
        tableChips: 0
    })
}))

export default useUserState;