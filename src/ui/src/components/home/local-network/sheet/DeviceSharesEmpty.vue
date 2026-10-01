<script setup lang="ts">
import { PaperclipIcon } from '@lucide/vue';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

defineEmits(['refresh']);
defineProps<{ name: string }>();
</script>

<template>
  <Empty class="border border-dashed">
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <PaperclipIcon />
      </EmptyMedia>
      <EmptyTitle>{{ $t('noShares') }}</EmptyTitle>
      <EmptyDescription>{{ $t('networkDeviceNoShares', { device: name }) }}</EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Button variant="outline" size="sm" @click="$emit('refresh')">
        {{ $t('refresh') }}
      </Button>
    </EmptyContent>
  </Empty>
</template>
