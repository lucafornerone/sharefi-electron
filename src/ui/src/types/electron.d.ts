import {
  ConnectionType,
  DeviceOsIp,
  type DeviceSettings,
  LocalDevice,
  TotalShares,
} from '#shared/types/ipc.types.ts';
import { type ItemType, SharedItem } from '#shared/types/item.types.ts';

export {};

declare global {
  interface Window {
    electronApi: {
      openFiles: () => Promise<boolean>;
      openFolders: () => Promise<boolean>;
      findDevices: () => Promise<LocalDevice[]>;
      getName: () => Promise<string>;
      getTotalShares: () => Promise<TotalShares>;
      getConnectionType: () => Promise<ConnectionType>;
      getOsIp: () => Promise<DeviceOsIp>;
      setSettings: (settings: DeviceSettings) => Promise<boolean>;
      getShares: () => Promise<SharedItem[]>;
      removeShare: (type: ItemType, id: number) => Promise<boolean>;
      getSettings: () => Promise<DeviceSettings>;
    };
  }
}
