import { StoreSlice } from '../interface'

export interface IQueryState {
    filter: string | null,
    setFilter: (_s: string) => void,
    list: string | null,
    setList: (_s: string) => void,

    resetQueries: () => void 
}

const createQuerySlice: StoreSlice<IQueryState> = set => ({
    filter: null,
    setFilter: (newFilter)=>set(state=>({...state, filter: newFilter})),
    list: null,
    setList: (newList)=>set(state=>({...state, list: newList})),
    resetQueries: () => set(()=>({list: null, filter: null}))
})

export default createQuerySlice;