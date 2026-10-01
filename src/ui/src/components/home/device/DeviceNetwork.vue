<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton';
import { useConnectionType } from '@/composables/useNetwork.ts';

const { connectionType } = useConnectionType();
</script>

<template>
    <span>{{ $t('connected') }}</span>
    <Skeleton class="h-4 w-24" v-if="connectionType === undefined" />
    <span v-else>{{ connectionType === 'wifi' ? $t('toWifi') : $t('wired') }}</span>
</template>