const {
    app,
    BrowserWindow,
    ipcMain,
    Notification
} = require('electron');
const path = require('path');
const mongoose = require('mongoose').set('debug', true);

const isDev = !app.isPackaged;

// app.disableHardwareAcceleration()

mongoose.connect(
    require('./db/config').db, {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
    }).then(_ => {
        console.log('connected to mongodb')
    }).catch(err => {
        console.log(err)
        console.error('failed to connect to mongodb');
    });

function createWindow() {
    const win = new BrowserWindow({
        width:900, minWidth:600,
        height: 768, minHeight: 768,
        frame: false,
        webPreferences: {
            nodeIntegration: false,
            devTools: true,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.webContents.openDevTools();
    win.loadFile('./index.html')
}

if(isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    })
}

const {todoController} = require('./db/controllers')
const {todoConstants} = require('./constants')

ipcMain.on(todoConstants.CREATE_TODO, todoController.createTodo);
ipcMain.on(todoConstants.ARCHIVE_TODO, todoController.archiveTodo);
ipcMain.on(todoConstants.GET_USER_PENDING_TODO, todoController.getUserPendingTodos);
ipcMain.on(todoConstants.TOGGLE_DONE_TODO, todoController.toggleTodoDoneById);
ipcMain.on(todoConstants.UPDATE_STATUS_TODO, todoController.updateStatusTodo);
ipcMain.on(todoConstants.GET_ALL_SET_NAME_TODO, todoController.getAllSetNameTodo);
ipcMain.on(todoConstants.GET_USER_ARCHIVED_TODO, todoController.getUserArchivedTodo);
// new Notification({title: 'Notification', body: message}).show()

app.whenReady().then(createWindow)