import { OperatingSystem } from '#shared/types/device.types.ts';

export type DeviceNetwork = {
  name: string;
  os: OperatingSystem;
  items: number;
};
