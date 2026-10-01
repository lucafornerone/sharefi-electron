import { APP_CONFIG } from '#shared/constants.ts';
import { type DesktopOperatingSystem, type OperatingSystem } from './device.types.ts';

export type LocalDevice = {
  ip: string;
  name: string;
  os: OperatingSystem;
};

export type TotalShares = {
  files: number;
  folders: number;
};

export type ConnectionType = 'wifi' | 'wired';

export type DeviceOsIp = {
  os: DesktopOperatingSystem;
  ip: string;
};

export type DeviceSettings = {
  name: string;
  language: Language;
};

export type Language = (typeof APP_CONFIG.LANGUAGES)[number];
