const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const fs = require('fs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1080,
    height: 720,
    minWidth: 640,
    minHeight: 640,
    devTools: false,
    autoHideMenuBar: true,
    maximizable: true,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true  // Разрешение на использование node.js API в рендерере
    }
  });

  mainWindow.loadFile('index.html');

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('getInitialConfig');
  });
}

app.whenReady().then(() => {
  globalShortcut.register('Control+Shift+I', () => {
    // When the user presses Ctrl + Shift + I, this function will get called
    // You can modify this function to do other things, but if you just want
    // to disable the shortcut, you can just return false
    return false;
  });
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('saveConfig', (event, data) => {
  fs.writeFileSync('config.json', JSON.stringify(data));
});
