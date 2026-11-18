import { app, BrowserWindow, ipcMain, nativeTheme } from 'electron';
import { registerIpcs } from '#core/ipc/index.ipc.ts';
import { Ipc } from '#core/ipc/ipc.enum.ts';
import { storeService } from '#core/services/StoreService.ts';
import { openServer } from '#server/index.ts';
import { disableSelfSignedErrors } from './network.ts';
import { windowBackgroundColor } from './utils.ts';

export async function initializeApp(createWindow: () => BrowserWindow) {
  app.commandLine.appendSwitch('ignore-certificate-errors', 'true');
  app.whenReady().then(async () => {
    await initializeMain();
    const win = createWindow();

    ipcMain.handle(Ipc.AppReady, () => {
      win.show();
    });

    nativeTheme.on('updated', () => {
      win.setBackgroundColor(windowBackgroundColor());
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
}

async function initializeMain() {
  // initialize electron store for data persistence
  await storeService.initialize();
  // create hono server for http requests
  await openServer();
  // register ipcs for core <-> ui bridge
  registerIpcs();
  // ignore other devices' self signed certificate error
  disableSelfSignedErrors();
}
