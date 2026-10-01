import { ipcMain } from 'electron';
import { findDevices } from '#core/lib/network.ts';
import { Ipc } from './ipc.enum.ts';

export function registerNetworkDevicesIpc() {
  ipcMain.handle(Ipc.NetworkDevices, async () => {
    return await findDevices();
  });
}
