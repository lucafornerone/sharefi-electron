<script setup lang="ts">
import { File, Folder } from '@lucide/vue';
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

defineEmits(['remove']);
defineProps<{ item: SharedItem }>();
</script>

<template>
    <Item variant="muted">
        <ItemMedia variant="icon">
            <File v-if="item.type === 'file'" />
            <Folder v-else />
        </ItemMedia>
        <ItemContent>
            <ItemTitle>{{ item.name }}</ItemTitle>
            <ItemDescription>
                <span v-if="item.type === 'file'">{{ item.extension }} • {{ item.size }}</span>
                <span v-else>{{ $t('folderItems', item.totFiles) }}</span>
            </ItemDescription>
        </ItemContent>
        <ItemActions>
            <Button variant="outline" size="sm" @click="$emit('remove')">
                {{ $t('remove') }}
            </Button>
        </ItemActions>
    </Item>
</template>