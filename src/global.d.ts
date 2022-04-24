export interface IElectronAPI {
  todoApi: (_channel: string, _data: any) => void,
  receive: (_channel: string, _cb: (_data: any)=>void) => void,
  removeAllListeners: (_channel: string) => void
}
  
declare global {
  interface Window {
    electron: IElectronAPI
  }
}