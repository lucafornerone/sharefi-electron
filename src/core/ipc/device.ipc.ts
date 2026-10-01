import { ipcMain } from 'electron';
import { deviceSettings, osIp, updateDeviceSettings } from '#core/lib/device.ts';
import { networkConnectionType } from '#core/lib/network.ts';
import { itemService } from '#core/services/ItemService.ts';
import { storeService } from '#core/services/StoreService.ts';
import { DeviceSettings } from '#shared/types/ipc.types.ts';
import { ItemType } from '#shared/types/item.types.ts';
import { Ipc } from './ipc.enum.ts';

export function registerDeviceNameIpc() {
  ipcMain.handle(Ipc.DeviceName, () => {
    return storeService.getName();
  });
}

export function registerDeviceTotalSharesIpc() {
  ipcMain.handle(Ipc.DeviceTotalShares, () => {
    return {
      files: itemService.totalFiles(),
      folders: itemService.totalFolders(),
    };
  });
}

export function registerDeviceConnectionIpc() {
  ipcMain.handle(Ipc.DeviceConnection, async () => {
    return await networkConnectionType();
  });
}

export function registerDeviceOsIpIpc() {
  ipcMain.handle(Ipc.DeviceOsIp, async () => {
    return await osIp();
  });
}

export function registerDeviceUpdateSettingsIpc() {
  ipcMain.handle(Ipc.DeviceUpdateSettings, (_event, settings: DeviceSettings) => {
    return updateDeviceSettings(settings);
  });
}

export function registerDeviceSharesIpc() {
  ipcMain.handle(Ipc.DeviceShares, () => {
    return itemService.getSharedItems();
  });
}

export function registerDeviceRemoveShareIpc() {
  ipcMain.handle(Ipc.DeviceRemoveShare, (_event, type: ItemType, id: number) => {
    return itemService.removeShare(type, id);
  });
}

export function registerDeviceSettingsIpc() {
  ipcMain.handle(Ipc.DeviceSettings, () => {
    return deviceSettings();
  });
}
