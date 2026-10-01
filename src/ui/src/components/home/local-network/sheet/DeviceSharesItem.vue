<script setup lang="ts">
import { File, Folder } from '@lucide/vue';
import { computed } from 'vue';
import type { SharedItem } from '#shared/types/item.types.ts';
import { Button } from '@/components/ui/button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { itemActionText, itemDescription, onItemAction } from '@/lib/utils.ts';
import { downloadService } from '@/services/DownloadService.ts';

const props = defineProps<{ ip: string; item: SharedItem }>();

const downloadId = computed(() => `${props.ip}-${props.item.id}`);
const status = computed(() => downloadService.items.status.get(downloadId.value));
const description = computed(() => {
  return itemDescription(downloadId.value, props.item, status.value);
});
const actionText = computed(() => {
  return itemActionText(status.value);
});
</script>

<template>
  <Item variant="muted">
    <ItemMedia variant="icon">
      <File v-if="item.type === 'file'" />
      <Folder v-else />
    </ItemMedia>
    <ItemContent>
      <ItemTitle>{{ item.name }}</ItemTitle>
      <ItemDescription>{{ description }}</ItemDescription>
    </ItemContent>
    <ItemActions>
      <Button :variant="status === 'ready' ? 'default' : 'outline'" size="sm"
        @click="onItemAction(ip, item, status)">
        {{ actionText }}
      </Button>
    </ItemActions>
  </Item>

</template>