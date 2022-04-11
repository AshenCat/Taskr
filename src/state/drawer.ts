import create from 'zustand'

interface DrawerState {
    drawerOpen: boolean;
    setDrawer: (s: boolean) => void;
    selected: string | null;
    setSelected: (s: string) => void;
}

const useDrawer = create<DrawerState>(set => ({
    drawerOpen: false,
    setDrawer: (newState) => set(state=>({...state, drawerOpen: newState})),
    selected: null,
    setSelected: (selected) => set(state=>({...state, selected: selected}))
}))

export default useDrawer