import { contextBridge, ipcRenderer } from 'electron';
import { Ipc } from '#core/ipc/ipc.enum.ts';
import { DeviceSettings } from '#shared/types/ipc.types.ts';
import { ItemType } from '#shared/types/item.types.ts';

contextBridge.exposeInMainWorld('electronApi', {
  openFiles: () => ipcRenderer.invoke(Ipc.DialogFile),
  openFolders: () => ipcRenderer.invoke(Ipc.DialogFolder),
  findDevices: () => ipcRenderer.invoke(Ipc.NetworkDevices),
  getName: () => ipcRenderer.invoke(Ipc.DeviceName),
  getTotalShares: () => ipcRenderer.invoke(Ipc.DeviceTotalShares),
  getConnectionType: () => ipcRenderer.invoke(Ipc.DeviceConnection),
  getOsIp: () => ipcRenderer.invoke(Ipc.DeviceOsIp),
  setSettings: (settings: DeviceSettings) => ipcRenderer.invoke(Ipc.DeviceUpdateSettings, settings),
  getShares: () => ipcRenderer.invoke(Ipc.DeviceShares),
  removeShare: (type: ItemType, id: number) => ipcRenderer.invoke(Ipc.DeviceRemoveShare, type, id),
  getSettings: () => ipcRenderer.invoke(Ipc.DeviceSettings),
});
