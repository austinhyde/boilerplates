const { app, BrowserWindow, ipcMain } = require('electron');
const { format: formatUrl } = require('url');
const isDev = require('electron-is-dev');
const electronDebug = require('electron-debug');
const appConfig = require('../../app.config.js');

// register keyboard shortcuts for devtools, reloading, etc in development
electronDebug();
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;

function getAssetUrl(path) {
  return isDev
    ? new URL(path, `http://localhost:${appConfig.port}/`).toString()
    : new URL(`file:///${__dirname}/${path}`).href;
}

let mainWindow;
function createMainWindow() {
  const {screen} = require('electron');
  const {width, height} = screen.getPrimaryDisplay().workAreaSize;
  const window = new BrowserWindow({
    width: width*.75,
    height: height*.75,
    webPreferences:{
      // note: recent electron changes defaults to contextIsolation:true, nodeIntegration:false
      // which means that require('electron') in the renderer no longer works; we need to use
      // contextIsolation:false + preload to pass electron requires in.
      // todo: look into context bridge api as better alternative to contextIsolation:false
      preload: __dirname+'/preload.js',
      contextIsolation: false,
    },
  });

  if (isDev) {
    window.webContents.openDevTools();
  }
  window.loadURL(getAssetUrl('index.html'));
  window.on('closed', () => {
    mainWindow = null;
  });
  return window;
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (!mainWindow) {
    mainWindow = createMainWindow();
  }
});

app.on('ready', () => {
  mainWindow = createMainWindow();
});


// register a test IPC handler for our boilerplate app
ipcMain.on('name-updated', (e, name) => {
  mainWindow?.webContents.send('greet', `hello, ${name}`);
});