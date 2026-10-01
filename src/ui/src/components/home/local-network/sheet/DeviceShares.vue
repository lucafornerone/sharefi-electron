<script setup lang="ts">
import { onMounted, watch } from 'vue';
import type { LocalDevice } from '#shared/types/ipc.types.ts';
import { Button } from '@/components/ui/button';
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useDeviceDetail } from '@/composables/useNetwork.ts';
import DeviceSharesEmpty from './DeviceSharesEmpty.vue';
import DeviceSharesItem from './DeviceSharesItem.vue';

const props = defineProps<{ device: LocalDevice; open: boolean }>();
const { fetchSharedItems, items, isLoading } = useDeviceDetail();

onMounted(() => {
  loadItems();
});

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      loadItems();
    }
  }
);

function loadItems() {
  fetchSharedItems(props.device.ip);
}
</script>

<template>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>
        <span v-if="items.length === 0">{{ device.name }}</span>
        <span v-else>{{ $t('sharesBy') }} {{ device.name }}</span>
      </SheetTitle>
      <SheetDescription>{{ device.os }} • {{ device.ip }}</SheetDescription>
    </SheetHeader>

    <DeviceSharesEmpty v-if="!isLoading && items.length === 0" class="m-4" :name="device.name" @refresh="loadItems()" />
    <div v-else class="no-scrollbar overflow-y-auto px-4 mt-4">
      <div class="flex w-full flex-col gap-6">
        <DeviceSharesItem v-for="item in items" :key="item.id" :ip="device.ip" :item="item" />
      </div>
    </div>

    <SheetFooter>
      <Button v-if="items.length > 0" :disabled="isLoading" @click="loadItems()">
        {{ $t('refresh') }}
      </Button>
      <SheetClose as-child>
        <Button variant="outline">
          {{ $t('close') }}
        </Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</template>