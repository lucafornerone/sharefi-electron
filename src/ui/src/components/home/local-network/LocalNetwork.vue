<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item';
import { Sheet } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { useDeviceSheet } from '@/composables/useDevice.ts';
import { useLocalDevices } from '@/composables/useNetwork.ts';
import LocalNetworkItem from './LocalNetworkItem.vue';
import DeviceShares from './sheet/DeviceShares.vue';

const { fetchLocalDevices, devices, isLoading } = useLocalDevices();
const { isSheetOpen, selectedDevice, openDeviceDetails } = useDeviceSheet();
</script>

<template>
  <Item>
    <ItemContent>
      <ItemTitle>{{ $t('devices') }}</ItemTitle>
      <ItemDescription>
        <Skeleton class="h-4 w-32" v-if="isLoading" />
        <span v-else>{{ $t('devicesOnNetwork', devices.length) }}</span>
      </ItemDescription>
    </ItemContent>
    <ItemActions>
      <Button variant="outline" size="sm" @click="fetchLocalDevices()" :disabled="isLoading">
        {{ $t('refresh') }}
      </Button>
    </ItemActions>
  </Item>

  <Skeleton class="h-8" v-if="isLoading" />
  <div v-else-if="devices.length > 0" class="flex flex-col gap-3 overflow-y-auto no-scrollbar max-h-60">
    <Item variant="outline" size="sm" as-child v-for="device in devices" :key="device.ip">
      <LocalNetworkItem :device="device" @click="openDeviceDetails(device)" />
    </Item>
  </div>

  <Sheet v-model:open="isSheetOpen">
    <DeviceShares v-if="selectedDevice" :open="isSheetOpen" :device="selectedDevice" />
  </Sheet>
</template>