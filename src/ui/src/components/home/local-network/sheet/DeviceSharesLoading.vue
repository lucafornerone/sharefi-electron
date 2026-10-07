<script setup lang="ts">
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty';
import { Skeleton } from '@/components/ui/skeleton';
</script>

<template>
  <Empty class="border border-dashed m-4">
    <EmptyHeader>
      <EmptyTitle>
        <Skeleton class="h-8 w-32" />
      </EmptyTitle>
      <EmptyDescription>
        <Skeleton class="h-4 w-48" />
      </EmptyDescription>
    </EmptyHeader>
  </Empty>
</template>
