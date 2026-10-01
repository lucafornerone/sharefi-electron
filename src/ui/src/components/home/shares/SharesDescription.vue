<script setup lang="ts">
defineProps<{ totalFiles: number; totalFolders: number }>();
</script>

<template>
    <span v-if="totalFiles === 0 && totalFolders === 0">{{ $t('noShares') }}</span>
    <span v-else>
        {{
            $t('sharedItems', {
                fileText: $t('sharedFiles', totalFiles),
                folderText: $t('sharedFolders', totalFolders)
            })
        }}
    </span>
</template>