import create, { SetState, GetState } from "zustand";
import createDrawerSlice from "./slice/drawer";
import createAgendaSlice from "./slice/agenda";



const createRootSlice = (set: SetState<any>, get: GetState<any>) => ({
    ...createDrawerSlice(set, get),
    ...createAgendaSlice(set, get)
})

const useStore = create(createRootSlice);

export default useStore;