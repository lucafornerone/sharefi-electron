<script setup lang="ts">
import { BadgeAlertIcon, BadgeCheckIcon } from '@lucide/vue';
import { Button } from '@/components/ui/button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { Sheet } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { useDeviceName, useSettingsSheet } from '@/composables/useDevice.ts';
import DeviceNetwork from './DeviceNetwork.vue';
import Settings from './sheet/Settings.vue';

defineProps<{ isOnline: boolean }>();
const { isSheetOpen, openSettings, closeSettings } = useSettingsSheet();
const { name, refreshName } = useDeviceName();

function close() {
  closeSettings();
  refreshName();
}
</script>

<template>
    <Item variant="muted">
        <ItemMedia variant="icon">
            <BadgeCheckIcon v-if="isOnline"></BadgeCheckIcon>
            <BadgeAlertIcon v-else></BadgeAlertIcon>
        </ItemMedia>
        <ItemContent>
            <ItemTitle class="inline-flex items-center">
                <span v-if="name">{{ name }}</span>
                <Skeleton v-else class="h-4 w-24" />
            </ItemTitle>
            <ItemDescription class="inline-flex items-center space-x-1">
                <DeviceNetwork v-if="isOnline"></DeviceNetwork>
                <span v-else>{{ $t('offline') }}</span>
            </ItemDescription>
        </ItemContent>
        <ItemActions>
            <Button size="sm" variant="outline" :disabled="!isOnline" @click="openSettings()">
                {{ $t('settings') }}
            </Button>
        </ItemActions>
    </Item>

    <Sheet v-model:open="isSheetOpen">
        <Settings v-if="isOnline" :open="isSheetOpen" @close="close()" />
    </Sheet>
</template>