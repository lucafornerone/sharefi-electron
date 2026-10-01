<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
import Device from '@/components/home/device/Device.vue';
import Shares from '@/components/home/shares/Shares.vue';
import { FieldSeparator } from '@/components/ui/field';
import { useNetworkStatus } from '@/composables/useNetwork.ts';
import LocalNetwork from './components/home/local-network/LocalNetwork.vue';

useColorMode();

const { isOnline } = useNetworkStatus();
</script>

<template>
  <div class="min-h-screen w-full flex items-center justify-center p-4">
    <div class="flex w-full max-w-md flex-col gap-6">
      <!-- card with current device name and connection status -->
      <Device :is-online="isOnline"></Device>
      <template v-if="isOnline">
        <!-- card with current device shares, files and folders -->
        <Shares />
        <FieldSeparator>{{ $t('localNetwork') }}</FieldSeparator>
        <!-- card with network device list -->
        <LocalNetwork />
      </template>
    </div>
  </div>
</template>
