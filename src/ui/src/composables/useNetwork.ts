import { onMounted, onUnmounted, type Ref, ref } from 'vue';
import { type ConnectionType, type LocalDevice } from '#shared/types/ipc.types.ts';
import type { SharedItem } from '#shared/types/item.types.ts';
import { getSharedItems } from '@/lib/api.ts';

export function useNetworkStatus() {
  const isOnline = ref(window.navigator.onLine);

  const updateStatus = () => {
    isOnline.value = window.navigator.onLine;
  };

  onMounted(() => {
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
  });

  onUnmounted(() => {
    window.removeEventListener('online', updateStatus);
    window.removeEventListener('offline', updateStatus);
  });

  return { isOnline };
}

export function useConnectionType() {
  const connectionType: Ref<ConnectionType | undefined> = ref();

  onMounted(async () => {
    connectionType.value = await window.electronApi.getConnectionType();
  });

  return { connectionType };
}

export function useLocalDevices() {
  const devices: Ref<LocalDevice[]> = ref([]);
  const isLoading = ref(false);

  onMounted(() => {
    fetchLocalDevices();
  });

  async function fetchLocalDevices() {
    isLoading.value = true;
    devices.value = await window.electronApi.findDevices();
    isLoading.value = false;
  }

  return { fetchLocalDevices, devices, isLoading };
}

export function useDeviceDetail() {
  const items: Ref<SharedItem[]> = ref([]);
  const isLoading = ref(false);

  async function fetchSharedItems(ip: string) {
    isLoading.value = true;
    items.value = await getSharedItems(ip);
    isLoading.value = false;
  }

  return { fetchSharedItems, items, isLoading };
}
