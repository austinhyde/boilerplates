// Need this file to pass electron APIs into web context
const electron = require('electron');
window.ipcRenderer = electron.ipcRenderer;