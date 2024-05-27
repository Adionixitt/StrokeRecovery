const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 720,
    height: 720,
    minWidth: 720,
    minHeight: 720,
    devTools: false,
    autoHideMenuBar: true,
    maximizable: false,
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
