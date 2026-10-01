<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
import { type Ref, ref, watch } from 'vue';
import type { Language } from '#shared/types/ipc.types.ts';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useSettingsSheet } from '@/composables/useDevice.ts';
import { updateSettings } from '@/lib/utils.ts';
import type { Theme } from '@/types/device.types.ts';
import SettingsLanguage from './SettingsLanguage.vue';
import SettingsTheme from './SettingsTheme.vue';

const props = defineProps<{ open: boolean }>();
const emit = defineEmits(['close']);
const { getSettings } = useSettingsSheet();

const name: Ref<string | undefined> = ref();
const language: Ref<Language | undefined> = ref();
const theme: Ref<Theme | undefined> = ref();

watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      const settings = await getSettings();
      name.value = settings.name;
      language.value = settings.language;
      theme.value = useColorMode({ emitAuto: true }).value;
    }
  }
);

async function submit() {
  const result = await updateSettings(name.value, language.value, theme.value);
  if (result) {
    emit('close');
  }
}
</script>

<template>
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>{{ $t('settings') }}</SheetTitle>
      <SheetDescription>{{ $t('settingsDescription') }}</SheetDescription>
    </SheetHeader>
    <FieldGroup class="gap-6 px-4">
      <Field>
        <FieldLabel>{{ $t('name') }}</FieldLabel>
        <Input type="text" v-model="name" />
      </Field>
      <Field>
        <FieldLabel>{{ $t('language') }}</FieldLabel>
        <SettingsLanguage v-model="language" />
      </Field>
      <Field>
        <FieldLabel>{{ $t('theme') }}</FieldLabel>
        <SettingsTheme v-model="theme" />
      </Field>
    </FieldGroup>
    <SheetFooter>
      <Button type="submit" :disabled="!name" @click="submit()">
        {{ $t('saveChanges') }}
      </Button>
      <SheetClose as-child>
        <Button variant="outline">
          {{ $t('close') }}
        </Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</template>