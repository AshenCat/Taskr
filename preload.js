const { ipcRenderer, contextBridge } = require('electron');
const { todoConstants, errorConstants } = require('./constants');

const master = [
    ...Object.values(todoConstants),
    ...Object.values(errorConstants)
];

contextBridge.exposeInMainWorld('electron', {
    todoApi: (channel, data) => {
        if(Object.values(todoConstants).includes(channel)) {
            ipcRenderer.send(channel, data)
        }
    },
    receive: (channel, cb)=>{
        if(master.includes(channel)){
            ipcRenderer.on(channel, (_e, ...args) => cb(...args))
        }
    },
    removeAllListeners: (channel) => {
        if(master.includes(channel)){
            ipcRenderer.removeAllListeners(channel)
        }
    }
})