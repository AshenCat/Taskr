import create, { SetState, GetState } from "zustand";
import createDrawerSlice from "./slice/drawer";
import createAgendaSlice from "./slice/agenda";
import createToastSlice from "./slice/toast";



const createRootSlice = (set: SetState<any>, get: GetState<any>) => ({
    ...createDrawerSlice(set, get),
    ...createAgendaSlice(set, get),
    ...createToastSlice(set,get)
})

const useStore = create(createRootSlice);

export default useStore;