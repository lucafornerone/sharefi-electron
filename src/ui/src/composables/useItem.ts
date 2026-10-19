import { onMounted, type Ref, ref } from 'vue';
import { type TotalShares } from '#shared/types/ipc.types.ts';
import type { ItemType, SharedItem } from '#shared/types/item.types.ts';

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
    const selectedItems = await window.electronApi.showSelectionDialog(type);
    if (selectedItems.length > 0) {
      isLoading.value = true;
      await window.electronApi.addShares(type, selectedItems);
      fetchTotalShares();
    }
  }

  return { fetchTotalShares, totalShares, isLoading, onShare };
}

export function useSharesSheet() {
  const isSheetOpen = ref(false);
  const items: Ref<SharedItem[]> = ref([]);
  const isLoading = ref(false);

  function openShares() {
    isSheetOpen.value = true;
  }

  function closeShares() {
    isSheetOpen.value = false;
  }

  async function loadShares() {
    items.value = await window.electronApi.getShares();
  }

  async function remove(item: SharedItem): Promise<boolean> {
    const isRemoved = await window.electronApi.removeShare(item.type, item.id);
    if (isRemoved) {
      await loadShares();
    }
    return isRemoved;
  }

  async function onShare(type: ItemType): Promise<boolean> {
    const selectedItems = await window.electronApi.showSelectionDialog(type);
    if (selectedItems.length === 0) {
      return false;
    }
    isLoading.value = true;
    await window.electronApi.addShares(type, selectedItems);
    await loadShares();
    isLoading.value = false;
    return true;
  }

  async function removeAll(): Promise<boolean> {
    const hasRemoved = await window.electronApi.removeAllShares();
    if (hasRemoved) {
      await loadShares();
    }
    return hasRemoved;
  }

  return {
    isSheetOpen,
    openShares,
    closeShares,
    loadShares,
    items,
    remove,
    onShare,
    removeAll,
    isLoading,
  };
}
