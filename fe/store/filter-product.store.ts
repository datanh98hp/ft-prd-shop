import { create } from "zustand";


interface FilterProductProps {
    keyword?: string;
    page?: string | number| undefined; 
    items_per_page?: string | number | undefined;
    product_cate_id?: string | number | undefined;
    sortBy?: string;
    [key: string]: any;
}
export interface StoreFilterState {
    state: FilterProductProps,
    setStateFilter: (payload: FilterProductProps) => void;

}
const initiaState = {
    keyword: "",page: 1, items_per_page: 6, sortBy: "DESC"
}
export const useFilterStore = create<StoreFilterState>()((set) => ({
    state: initiaState,
    setStateFilter: (payload) => set((state) => ({ state: { ...state.state, ...payload } })),
}));
