const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
const path = require('path');

let backendProcess;

function startBackend() {
  const apiDir = path.join(__dirname, '..', 'api');
  backendProcess = spawn('npm', ['run', 'start:dev'], {
    cwd: apiDir,
    shell: true,
    stdio: 'inherit',
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  const isDev = !app.isPackaged;

  if (isDev) {
    // Assumes you are running `npm run dev` in apps/admin (Vite)
    win.loadURL('http://localhost:5175/');
    win.webContents.openDevTools();
  } else {
    // In a future step, point to the built admin dist
    const indexPath = path.join(__dirname, '..', 'admin', 'dist', 'index.html');
    win.loadFile(indexPath);
  }
}

app.whenReady().then(() => {
  startBackend();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  if (backendProcess) {
    backendProcess.kill();
  }
});

