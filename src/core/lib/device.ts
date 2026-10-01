import { v4DefaultGateway } from 'network-default-gateway';
import { storeService } from '#core/services/StoreService.ts';
import { DeviceOsIp, DeviceSettings } from '#shared/types/ipc.types.ts';
import { osByPlatform } from './utils.ts';

export async function osIp(): Promise<DeviceOsIp> {
  const { ip } = await v4DefaultGateway();
  return {
    ip,
    os: osByPlatform(),
  };
}

export function updateDeviceSettings(settings: DeviceSettings): boolean {
  if (!settings.name || !settings.language) {
    return false;
  }
  storeService.setName(settings.name);
  storeService.setLanguage(settings.language);
  return true;
}

export function deviceSettings(): DeviceSettings {
  return {
    name: storeService.getName(),
    language: storeService.getLanguage(),
  };
}
