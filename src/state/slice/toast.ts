import { StoreSlice } from '../interface'

export interface IToastState {
    toastOpen: boolean;
    setToastOpen: (s: boolean) => void;
    toastMessage: string | null;
    setToastMessage: (s: string) => void;
    toastVariant: string | null;
    setToastVariant: (s: string) => void;
}


const createToastSlice: StoreSlice<IToastState> = set => ({
    toastOpen: false,
    setToastOpen: (newState) => set(state=>({...state, toastOpen: newState})),
    toastMessage: '',
    setToastMessage: (selected) => set(state=>({...state, toastSelected: selected})),
    toastVariant: '',
    setToastVariant: (variant) => set(state=>({...state, toastVariant: variant}))
})

export default createToastSlice;