import { join } from 'node:path';
import { app, BrowserWindow, ipcMain } from 'electron';
import { initializeApp } from '#core/lib/startup.ts';
import { Ipc } from './ipc/ipc.enum.ts';

function createWindow(): BrowserWindow {
  const win = new BrowserWindow({
    width: 860,
    height: 720,
    minWidth: 800,
    minHeight: 600,
    show: false,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
    },
  });
  win.loadFile('./ui/index.html');
  win.removeMenu();
  return win;
}

app.commandLine.appendSwitch('ignore-certificate-errors', 'true');
app.whenReady().then(async () => {
  await initializeApp();
  const win = createWindow();

  ipcMain.handle(Ipc.AppReady, () => {
    win.show();
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  app.quit();
});
