import { join } from 'node:path';
import { app, BrowserWindow } from 'electron';
import { initializeApp } from '#core/lib/startup.ts';

function createWindow() {
  const win = new BrowserWindow({
    width: 860,
    height: 720,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
    },
  });
  win.loadFile('./ui/index.html');
  win.removeMenu();
}

app.commandLine.appendSwitch('ignore-certificate-errors', 'true');
app.whenReady().then(async () => {
  await initializeApp();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  app.quit();
});
