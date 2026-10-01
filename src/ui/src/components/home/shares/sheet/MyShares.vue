<script setup lang="ts">
import { watch } from 'vue';
import type { ItemType, SharedItem } from '#shared/types/item.types.ts';
import { Button } from '@/components/ui/button';
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { useDeviceOsIp } from '@/composables/useDevice.ts';
import { useSharesSheet } from '@/composables/useItem.ts';
import { openOsModalItems } from '@/lib/utils.ts';
import MySharesEmpty from './MySharesEmpty.vue';
import MySharesItem from './MySharesItem.vue';

const emit = defineEmits(['refresh']);
const props = defineProps<{ open: boolean }>();
const { loadShares, items, removeShare } = useSharesSheet();
const { device } = useDeviceOsIp();

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      loadShares();
    }
  }
);

async function remove(item: SharedItem) {
  const isRemoved = await removeShare(item);
  if (isRemoved) {
    emit('refresh');
  }
}
async function onShare(type: ItemType) {
  const hasNewShares = await openOsModalItems(type);
  if (hasNewShares) {
    loadShares();
    emit('refresh');
  }
}
</script>

<template>
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>{{ $t('myShares') }}</SheetTitle>
      <SheetDescription>
        <Skeleton v-if="device === undefined" class="h-4 w-24" />
        <span v-else>{{ device.os }} • {{ device.ip }}</span>
      </SheetDescription>
    </SheetHeader>

    <MySharesEmpty v-if="items.length === 0" class="m-4" @share-file="onShare('file')"
      @share-folder="onShare('folder')" />
    <div v-else class="no-scrollbar overflow-y-auto px-4 mt-4">
      <div class="flex w-full flex-col gap-6">
        <MySharesItem v-for="item in items" :key="item.id" :item="item" @remove="remove(item)" />
      </div>
    </div>

    <SheetFooter>
      <SheetClose as-child>
        <Button variant="outline">
          {{ $t('close') }}
        </Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</template>