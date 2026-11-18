import { BrowserWindow, IpcMainInvokeEvent } from 'electron';
import { v4DefaultGateway } from 'network-default-gateway';
import { storeService } from '#core/services/StoreService.ts';
import { DeviceOsIp, DeviceSettings } from '#shared/types/ipc.types.ts';
import { osByPlatform, windowBackgroundColor } from './utils.ts';

export async function osIp(): Promise<DeviceOsIp> {
  const { ip } = await v4DefaultGateway();
  return {
    ip,
    os: osByPlatform(),
  };
}

export function updateDeviceSettings(event: IpcMainInvokeEvent, settings: DeviceSettings): boolean {
  if (!settings.name || !settings.language || !settings.theme) {
    return false;
  }
  storeService.setName(settings.name);
  storeService.setLanguage(settings.language);
  storeService.setTheme(settings.theme);
  // update window background color
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) {
    win.setBackgroundColor(windowBackgroundColor());
  }
  return true;
}

export function deviceSettings(): DeviceSettings {
  return {
    name: storeService.getName(),
    language: storeService.getLanguage(),
    theme: storeService.getTheme(),
  };
}
