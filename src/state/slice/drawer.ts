import { StoreSlice } from '../interface'

export interface IDrawerState {
    drawerOpen: boolean;
    setDrawerOpen: (s: boolean) => void;
    drawerSelected: string | null;
    setDrawerSelected: (s: string) => void;
}


const createDrawerSlice: StoreSlice<IDrawerState> = set => ({
    drawerOpen: false,
    setDrawerOpen: (newState) => set(state=>({...state, drawerOpen: newState})),
    drawerSelected: null,
    setDrawerSelected: (selected) => set(state=>({...state, drawerSelected: selected}))
})

export default createDrawerSlice;