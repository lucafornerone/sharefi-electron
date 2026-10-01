<script setup lang="ts">
import type { Language } from '#shared/types/ipc.types.ts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const language = defineModel<Language>();

const languages: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'it', label: 'Italiano' },
  { code: 'pt', label: 'Português' },
];
</script>

<template>
    <Select v-model="language">
        <SelectTrigger>
            <SelectValue />
        </SelectTrigger>
        <SelectContent>
            <SelectItem v-for="lang in languages" :key="lang.code" :value="lang.code">
                {{ lang.label }}
            </SelectItem>
        </SelectContent>
    </Select>
</template>