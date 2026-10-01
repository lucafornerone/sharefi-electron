import { readonly, shallowReactive } from 'vue';
import { APP_CONFIG } from '#shared/constants.ts';
import type { SharedItem } from '#shared/types/item.types.ts';
import { streamItem } from '@/lib/api.ts';

export type DownloadStatus = 'not_started' | 'ready' | 'downloading' | 'failed' | 'canceled';

class DownloadService {
  // map keys are device ip + item id
  private downloads: {
    status: Map<string, DownloadStatus>;
    progress: Map<string, number>;
    controller: Map<string, AbortController>;
    blob: Map<string, Blob>;
  } = {
    status: shallowReactive(new Map()),
    progress: shallowReactive(new Map()),
    controller: shallowReactive(new Map()),
    blob: shallowReactive(new Map()),
  };

  get items() {
    return readonly(this.downloads);
  }

  id(ip: string, itemId: number) {
    return `${ip}-${itemId}`;
  }

  async download(ip: string, item: SharedItem) {
    const id = this.id(ip, item.id);
    // set new download as not started
    this.downloads.status.set(id, 'not_started');

    const controller = new AbortController();
    const response = await streamItem(ip, item.type, item.id, item.name, controller.signal);

    if (!response.ok) {
      this.downloads.status.set(id, 'failed');
      return;
    }

    const reader = response.body?.getReader();
    if (!reader) {
      this.downloads.status.set(id, 'failed');
      return;
    }

    this.downloads.status.set(id, 'downloading');
    this.downloads.controller.set(id, controller);
    this.downloads.progress.set(id, 0);

    try {
      let totalBytes: number | undefined;
      if (item.type === 'file') {
        totalBytes = response.headers.get('Content-Length')
          ? parseInt(response.headers.get('Content-Length') || '0', 10)
          : item.bytes;
      }

      let receivedBytes = 0;
      const chunks: Uint8Array<ArrayBuffer>[] = [];
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        chunks.push(value);
        receivedBytes += value.length;
        if (item.type === 'file' && totalBytes) {
          // set percentage
          this.downloads.progress.set(id, Math.trunc((receivedBytes / totalBytes) * 100));
        } else {
          this.downloads.progress.set(id, receivedBytes);
        }
      }
      this.downloads.status.set(id, 'ready');
      this.downloads.controller.delete(id);
      this.downloads.progress.delete(id);
      this.downloads.blob.set(id, new Blob(chunks));
    } catch (error) {
      const isCanceled = error instanceof DOMException && error.name === 'AbortError';
      if (isCanceled) {
        this.downloads.status.set(id, 'canceled');
      } else {
        this.downloads.status.set(id, 'failed');
        this.downloads.progress.delete(id);
      }

      this.downloads.controller.delete(id);
    }
  }

  cancel(ip: string, itemId: number) {
    const id = this.id(ip, itemId);
    const controller = this.downloads.controller.get(id);
    if (controller) {
      controller.abort();
    }
  }

  save(ip: string, item: SharedItem) {
    const id = this.id(ip, item.id);
    const blob = this.downloads.blob.get(id);
    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download =
        item.type === 'file' ? item.fullName : `${item.name}.${APP_CONFIG.ARCHIVE_EXTENSION}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      this.downloads.status.set(id, 'failed');
      this.downloads.progress.delete(id);
      this.downloads.controller.delete(id);
    }
  }
}

export const downloadService = new DownloadService();
