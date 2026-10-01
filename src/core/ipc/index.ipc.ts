import {
  registerDeviceConnectionIpc,
  registerDeviceNameIpc,
  registerDeviceOsIpIpc,
  registerDeviceRemoveShareIpc,
  registerDeviceSettingsIpc,
  registerDeviceSharesIpc,
  registerDeviceTotalSharesIpc,
  registerDeviceUpdateSettingsIpc,
} from './device.ipc.ts';
import { registerDialogFileIpc, registerDialogFolderIpc } from './dialog.ipc.ts';
import { registerNetworkDevicesIpc } from './network.ipc.ts';

export function registerIpcs() {
  registerDialogFileIpc();
  registerDialogFolderIpc();
  registerNetworkDevicesIpc();
  registerDeviceNameIpc();
  registerDeviceTotalSharesIpc();
  registerDeviceConnectionIpc();
  registerDeviceOsIpIpc();
  registerDeviceUpdateSettingsIpc();
  registerDeviceSharesIpc();
  registerDeviceRemoveShareIpc();
  registerDeviceSettingsIpc();
}
