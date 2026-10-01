import { onMounted, type Ref, ref } from 'vue';
import type { DeviceOsIp, DeviceSettings, LocalDevice } from '#shared/types/ipc.types.ts';

export function useDeviceName() {
  const name: Ref<string | undefined> = ref();

  onMounted(async () => {
    name.value = await window.electronApi.getName();
  });

  async function refreshName() {
    name.value = await window.electronApi.getName();
  }

  return { name, refreshName };
}

export function useDeviceSheet() {
  const isSheetOpen = ref(false);
  const selectedDevice: Ref<LocalDevice | undefined> = ref();

  function openDeviceDetails(device: LocalDevice) {
    selectedDevice.value = device;
    isSheetOpen.value = true;
  }

  return { isSheetOpen, selectedDevice, openDeviceDetails };
}

export function useDeviceOsIp() {
  const device: Ref<DeviceOsIp | undefined> = ref();

  onMounted(async () => {
    device.value = await window.electronApi.getOsIp();
  });

  return { device };
}

export function useSettingsSheet() {
  const isSheetOpen = ref(false);

  function openSettings() {
    isSheetOpen.value = true;
  }

  function closeSettings() {
    isSheetOpen.value = false;
  }

  async function getSettings(): Promise<DeviceSettings> {
    return await window.electronApi.getSettings();
  }

  return { isSheetOpen, openSettings, getSettings, closeSettings };
}
