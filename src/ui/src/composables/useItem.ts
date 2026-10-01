import { onMounted, type Ref, ref } from 'vue';
import { type TotalShares } from '#shared/types/ipc.types.ts';
import type { ItemType, SharedItem } from '#shared/types/item.types.ts';
import { openOsModalItems } from '@/lib/utils.ts';

export function useItemTotalShares() {
  const totalShares: Ref<TotalShares | undefined> = ref();
  const isLoading = ref(false);

  onMounted(() => {
    fetchTotalShares();
  });

  async function fetchTotalShares() {
    isLoading.value = true;
    totalShares.value = await window.electronApi.getTotalShares();
    isLoading.value = false;
  }

  async function onShare(type: ItemType) {
    const hasNewShares = await openOsModalItems(type);
    if (hasNewShares) {
      fetchTotalShares();
    }
  }

  return { fetchTotalShares, totalShares, isLoading, onShare };
}

export function useSharesSheet() {
  const isSheetOpen = ref(false);
  const items: Ref<SharedItem[]> = ref([]);

  function openShares() {
    isSheetOpen.value = true;
  }

  function closeShares() {
    isSheetOpen.value = false;
  }

  async function loadShares() {
    items.value = await window.electronApi.getShares();
  }

  async function removeShare(item: SharedItem): Promise<boolean> {
    const isRemoved = await window.electronApi.removeShare(item.type, item.id);
    if (isRemoved) {
      await loadShares();
    }
    return isRemoved;
  }

  return { isSheetOpen, openShares, closeShares, loadShares, items, removeShare };
}
