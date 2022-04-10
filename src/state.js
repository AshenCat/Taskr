import create from 'zustand'

const useStore = create(set => ({
    drawerOpen: false,
    toggleDrawer: () => set(state=>({drawerOpen: !state.drawerOpen})),
}))

export default useStore