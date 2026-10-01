<script setup lang="ts">
import { PaperclipIcon } from '@lucide/vue';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

defineEmits(['shareFile', 'shareFolder']);
</script>

<template>
  <Empty class="border border-dashed">
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <PaperclipIcon />
      </EmptyMedia>
      <EmptyTitle>{{ $t('noShares') }}</EmptyTitle>
      <EmptyDescription>{{ $t('noSharesDescription') }}</EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" size="sm">
            {{ $t('shareItem') }}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuGroup>
            <DropdownMenuItem @click="$emit('shareFile')">
              {{ $t('file') }}
            </DropdownMenuItem>
            <DropdownMenuItem @click="$emit('shareFolder')">
              {{ $t('folder') }}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </EmptyContent>
  </Empty>
</template>
