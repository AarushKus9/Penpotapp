const { app, BrowserWindow, ipcMain, Menu, nativeImage } = require('electron');
let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    frame: true,
    show: false,
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: true,
      preload: `${__dirname}/preload.js`,
    },
    icon: `${__dirname}/assets/logo.ico`,
  });

  mainWindow.loadURL('https://design.penpot.app/#');

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  Menu.setApplicationMenu(null);
}

app.on('ready', () => {
  createMainWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
});

ipcMain.on('window-minimize', () => mainWindow.minimize());
ipcMain.on('window-maximize', () => {
  if (mainWindow.isMaximized()) mainWindow.unmaximize();
  else mainWindow.maximize();
});
ipcMain.on('window-close', () => mainWindow.close());
