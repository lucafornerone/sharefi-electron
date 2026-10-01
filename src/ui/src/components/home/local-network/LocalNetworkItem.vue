<script setup lang="ts">
import { ChevronRightIcon, Laptop, Smartphone } from '@lucide/vue';
import { computed } from 'vue';
import type { LocalDevice } from '#shared/types/ipc.types.ts';
import { ItemActions, ItemContent, ItemMedia, ItemTitle } from '@/components/ui/item';

const props = defineProps<{ device: LocalDevice }>();

const deviceIcon = computed(() => {
  return ['Linux', 'macOS', 'Windows'].includes(props.device.os) ? Laptop : Smartphone;
});
</script>

<template>
    <a href="#">
        <ItemMedia>
            <component :is="deviceIcon" class="size-5" />
        </ItemMedia>
        <ItemContent>
            <ItemTitle>{{ device.name }}</ItemTitle>
        </ItemContent>
        <ItemActions>
            <ChevronRightIcon class="size-4" />
        </ItemActions>
    </a>
</template>