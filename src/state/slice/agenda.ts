import {StoreSlice} from '../interface'

export interface IAgendaState {
    todoCreateOpen: boolean;
    todoCreateSetOpen: (s: boolean) => void;
}

const createAgendaSlice: StoreSlice<IAgendaState> = set => ({
    todoCreateOpen: false,
    todoCreateSetOpen: (newState) => set(state=>({...state, todoCreateOpen: newState})),
})

export default createAgendaSlice