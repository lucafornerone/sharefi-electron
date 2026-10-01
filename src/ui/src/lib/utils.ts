import { useColorMode } from '@vueuse/core';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { WritableComputedRef } from 'vue';
import type { ComposerTranslation } from 'vue-i18n';
import type { Language } from '#shared/types/ipc.types.ts';
import type { ItemType, SharedItem } from '#shared/types/item.types.ts';
import { formatBytes } from '#shared/utils.ts';
import { type DownloadStatus, downloadService } from '@/services/DownloadService.ts';
import type { Theme } from '@/types/device.types.ts';
import { i18n } from './i18n.ts';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function openOsModalItems(type: ItemType): Promise<boolean> {
  return type === 'file'
    ? await window.electronApi.openFiles()
    : await window.electronApi.openFolders();
}

export async function updateSettings(
  name: string | undefined,
  language: Language | undefined,
  theme: Theme | undefined
): Promise<boolean> {
  if (name === undefined || language === undefined || theme === undefined) {
    return false;
  }

  const result = await window.electronApi.setSettings({ name, language });
  if (result) {
    // update app theme
    useColorMode().value = theme;
    // update app language
    (i18n.global.locale as WritableComputedRef<string>).value = language;
  }
  return result;
}

export function itemDescription(
  downloadId: string,
  item: SharedItem,
  status: DownloadStatus | undefined
): string {
  const t = i18n.global.t as ComposerTranslation;

  const progress = downloadService.items.progress.get(downloadId);
  switch (status) {
    case undefined:
      return item.type === 'file'
        ? `${item.extension} • ${item.size}`
        : t('folderItems', item.totFiles);
    case 'downloading':
      if (progress === undefined) {
        return '';
      } else if (item.type === 'file') {
        return `${t('downloading')} ${progress}%`;
      } else {
        return `${t('downloading')} ${formatBytes(progress)}`;
      }
    case 'canceled':
      if (progress === undefined) {
        return '';
      } else if (item.type === 'file') {
        return `${t('canceledAt')} ${progress}%`;
      } else {
        return `${t('canceledAt')} ${formatBytes(progress)}`;
      }
    case 'failed':
      return t('downloadFailed');
    case 'ready':
      return t('downloadReady');
    case 'not_started':
      return t('downloadNotStarted');
  }
}

export function itemActionText(status: DownloadStatus | undefined): string {
  const t = i18n.global.t as ComposerTranslation;
  if (status === undefined || status === 'not_started') {
    return t('download');
  } else if (status === 'downloading') {
    return t('cancel');
  } else if (status === 'canceled') {
    return t('restart');
  } else if (status === 'failed') {
    return t('retry');
  } else {
    return t('save');
  }
}

export function onItemAction(ip: string, item: SharedItem, status: DownloadStatus | undefined) {
  if (
    status === undefined ||
    status === 'not_started' ||
    status === 'canceled' ||
    status === 'failed'
  ) {
    downloadService.download(ip, item);
  } else if (status === 'downloading') {
    downloadService.cancel(ip, item.id);
  } else {
    downloadService.save(ip, item);
  }
}
