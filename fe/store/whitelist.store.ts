import { create } from "zustand";
export interface StoreWhitelistState {
    whitelist: Array<any>,
    addToWhitelist: (product: any) => void,
    removeWhitelist: (productId: any) => void,
    clearWhitelist: () => void
}
export const useWhitelistStore = create<StoreWhitelistState>()((set) => ({
    whitelist: [],
    addToWhitelist: (product) => set((state) => ({ whitelist: [product, ...state.whitelist] })),
    removeWhitelist: (productId) => set((state) => ({ whitelist: state.whitelist.filter((product) => product.id !== productId) })),
    clearWhitelist: () => set({ whitelist: [] }),
}));
