<script setup lang="ts">
import { RepeatOff } from '@lucide/vue';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

defineEmits(['tryAgain']);
defineProps<{ name: string }>();
</script>

<template>
  <Empty class="border border-dashed m-4">
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <RepeatOff />
      </EmptyMedia>
      <EmptyTitle>{{ $t('unableConnectDevice') }}</EmptyTitle>
      <EmptyDescription>{{ $t('deviceOffline', { device: name }) }}</EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Button variant="outline" size="sm" @click="$emit('tryAgain')">
        {{ $t('tryAgain') }}
      </Button>
    </EmptyContent>
  </Empty>
</template>
