import {create} from "zustand";	
export interface StoreCartState {
    cart: Array<any>,
    addToCart: (product: any) => void,
    removeFromCart: (productId: any) => void,
    clearCart: () => void
}
export const useCartStore = create<StoreCartState>()((set) => ({
    cart: [],
    addToCart: (product) => set((state) => ({ cart: [product, ...state.cart] })),
    removeFromCart: (productId) => set((state) => ({ cart: state.cart.filter((product) => product.id !== productId) })),
    clearCart: () => set({ cart: [] }),
}));
