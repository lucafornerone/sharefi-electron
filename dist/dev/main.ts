import { join } from 'node:path';
import { app, BrowserWindow } from 'electron';
import { initializeApp } from '../../src/core/lib/startup.ts';

function createDevWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 1200,
    webPreferences: {
      preload: join(import.meta.dirname, '../preload/preload.mjs'),
    },
  });
  win.webContents.openDevTools();
  win.loadURL('http://localhost:5173');
  win.removeMenu();
}

app.commandLine.appendSwitch('ignore-certificate-errors', 'true');
app.commandLine.appendSwitch('disable-web-security');
app.whenReady().then(async () => {
  await initializeApp();
  createDevWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createDevWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
