import { IAgendaItemProps } from '../../routes/agenda/item/AgendaItem';
import {StoreSlice} from '../interface'

export interface IAgendaState {
    todoCreateOpen: boolean;
    todoCreateSetOpen: (_s: boolean) => void;
    todoList: IAgendaItemProps[];
    setTodoList: (_list: IAgendaItemProps[])=>void;
}

const createAgendaSlice: StoreSlice<IAgendaState> = set => ({
    todoCreateOpen: false,
    todoCreateSetOpen: (newState) => set(state=>({...state, todoCreateOpen: newState})),
    todoList: [],
    setTodoList: (list) => set(state=>({...state, todoList: list}))
})

export default createAgendaSlice