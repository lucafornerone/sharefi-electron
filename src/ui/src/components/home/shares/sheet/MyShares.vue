<script setup lang="ts">
import { watch } from 'vue';
import type { ItemType, SharedItem } from '#shared/types/item.types.ts';
import SheetLoading from '@/components/home/common/SheetLoading.vue';
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
import MySharesEmpty from './MySharesEmpty.vue';
import MySharesItem from './MySharesItem.vue';

const emit = defineEmits(['refresh']);
const props = defineProps<{ open: boolean }>();
const { loadShares, items, remove, onShare, removeAll, isLoading } = useSharesSheet();
const { device } = useDeviceOsIp();

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      loadShares();
    }
  }
);

async function handleRemove(item: SharedItem) {
  if (await remove(item)) {
    emit('refresh');
  }
}
async function handleOnShare(type: ItemType) {
  if (await onShare(type)) {
    emit('refresh');
  }
}
async function handleRemoveAll() {
  if (await removeAll()) {
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

    <SheetLoading v-if="isLoading" />
    <MySharesEmpty v-else-if="items.length === 0" @share-file="handleOnShare('file')"
      @share-folder="handleOnShare('folder')" />
    <div v-else class="no-scrollbar overflow-y-auto px-4 mt-4">
      <div class="flex w-full flex-col gap-6">
        <MySharesItem v-for="item in items" :key="item.id" :item="item" @remove="handleRemove(item)" />
      </div>
    </div>

    <SheetFooter>
      <Button v-if="items.length > 0" @click="handleRemoveAll()">
        {{ $t('removeAll') }}
      </Button>
      <SheetClose as-child>
        <Button variant="outline">
          {{ $t('close') }}
        </Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</template>