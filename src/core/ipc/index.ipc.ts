import {
  registerDeviceConnectionIpc,
  registerDeviceNameIpc,
  registerDeviceOsIpIpc,
  registerDeviceRemoveAllSharesIpc,
  registerDeviceRemoveShareIpc,
  registerDeviceSettingsIpc,
  registerDeviceSharesIpc,
  registerDeviceTotalSharesIpc,
  registerDeviceUpdateSettingsIpc,
} from './device.ipc.ts';
import { registerItemSelectionDialogIpc, registerItemSharesIpc } from './item.ipc.ts';
import { registerNetworkDevicesIpc } from './network.ipc.ts';

export function registerIpcs() {
  registerItemSelectionDialogIpc();
  registerItemSharesIpc();
  registerNetworkDevicesIpc();
  registerDeviceNameIpc();
  registerDeviceTotalSharesIpc();
  registerDeviceConnectionIpc();
  registerDeviceOsIpIpc();
  registerDeviceUpdateSettingsIpc();
  registerDeviceSharesIpc();
  registerDeviceRemoveShareIpc();
  registerDeviceSettingsIpc();
  registerDeviceRemoveAllSharesIpc();
}
