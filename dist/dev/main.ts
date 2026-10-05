import { join } from 'node:path';
import { app, BrowserWindow, ipcMain } from 'electron';
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

function enableIpcLogging() {
  const originalHandle = ipcMain.handle.bind(ipcMain);
  ipcMain.handle = <T extends (...args: never[]) => unknown>(
    channel: string,
    listener: (
      event: Electron.IpcMainInvokeEvent,
      ...args: Parameters<T>
    ) => ReturnType<T> | Promise<ReturnType<T>>
  ) => {
    return originalHandle(channel, (event, ...args: Parameters<T>) => {
      console.log(`[IPC-MAIN] ${channel}`, args);
      return listener(event, ...args);
    });
  };
}

app.commandLine.appendSwitch('ignore-certificate-errors', 'true');
app.commandLine.appendSwitch('disable-web-security');
app.whenReady().then(async () => {
  enableIpcLogging();
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
