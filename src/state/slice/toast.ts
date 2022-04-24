import { StoreSlice } from '../interface'

interface INotificationData {
    category: string;
    type: string;
    silent: boolean;
    variant: string;
    message: string;
    metaData: any;
}
export interface IToastState {
    dataArray: INotificationData[];
    setDataArray: (_d: INotificationData[]) => void;
    toastOpen: boolean;
    setToastOpen: (_s: boolean) => void;
    toastMessage: string | null;
    setToastMessage: (_s: string) => void;
    toastVariant: string | null;
    setToastVariant: (_s: string) => void;
}


const createToastSlice: StoreSlice<IToastState> = set => ({
    dataArray: [],
    setDataArray: (data) => set(state=>({...state, dataArray: data})),
    toastOpen: false,
    setToastOpen: (newState) => set(state=>({...state, toastOpen: newState})),
    toastMessage: '',
    setToastMessage: (message) => set(state=>({...state, toastMessage: message})),
    toastVariant: '',
    setToastVariant: (variant) => set(state=>({...state, toastVariant: variant}))
})

export default createToastSlice;