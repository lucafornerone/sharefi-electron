<script setup lang="ts">
import { Monitor, Moon, Sun } from '@lucide/vue';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import type { Theme } from '@/types/device.types.ts';

const theme = defineModel<Theme>();
</script>

<template>
    <ToggleGroup v-model="theme" type="single" class="grid grid-cols-3 w-full border rounded-md overflow-hidden">
        <ToggleGroupItem value="dark" class="gap-2">
            <Moon class="h-4 w-4" />
            <span>{{ $t('dark') }}</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="light" class="gap-2">
            <Sun class="h-4 w-4" />
            <span>{{ $t('light') }}</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="auto" class="gap-2">
            <Monitor class="h-4 w-4" />
            <span>{{ $t('auto') }}</span>
        </ToggleGroupItem>
    </ToggleGroup>
</template>