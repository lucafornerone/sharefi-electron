<script setup lang="ts">
import { MoreVerticalIcon, PaperclipIcon, WrenchIcon } from '@lucide/vue';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item';
import { Sheet } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { useItemTotalShares, useSharesSheet } from '@/composables/useItem.ts';
import SharesDescription from './SharesDescription.vue';
import MyShares from './sheet/MyShares.vue';

const { fetchTotalShares, totalShares, isLoading, onShare } = useItemTotalShares();
const { isSheetOpen, openShares } = useSharesSheet();
</script>

<template>
    <Item variant="outline">
        <ItemContent>
            <ItemTitle>{{ $t('myShares') }}</ItemTitle>
            <ItemDescription>
                <Skeleton class="h-4 w-48" v-if="isLoading" />
                <SharesDescription v-else-if="totalShares !== undefined" :total-files="totalShares.files"
                    :total-folders="totalShares.folders" />
            </ItemDescription>
        </ItemContent>
        <ItemActions>
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button variant="outline" size="icon">
                        <MoreVerticalIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" class="w-42 overflow-hidden">
                    <DropdownMenuGroup>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <PaperclipIcon class="mr-2 size-4" />{{ $t('shareItem') }}
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                                <DropdownMenuRadioGroup>
                                    <DropdownMenuRadioItem value="file" @click="onShare('file')">
                                        {{ $t('file') }}
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="folder" @click="onShare('folder')">
                                        {{ $t('folder') }}
                                    </DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuItem @click="openShares()">
                            <WrenchIcon />{{ $t('manage') }}
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </ItemActions>
    </Item>

    <Sheet v-model:open="isSheetOpen">
        <MyShares :open="isSheetOpen" @refresh="fetchTotalShares()" />
    </Sheet>
</template>