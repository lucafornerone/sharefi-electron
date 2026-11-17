import { join } from 'node:path';
import { app, BrowserWindow, ipcMain } from 'electron';
import { Ipc } from '#core/ipc/ipc.enum.ts';
import { initializeApp } from '#core/lib/startup.ts';
import { windowBackgroundColor } from '#core/lib/utils.ts';

function createWindow(): BrowserWindow {
  const win = new BrowserWindow({
    width: 860,
    height: 720,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: windowBackgroundColor(),
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
