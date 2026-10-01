import { stat } from 'node:fs/promises';
import { mapItemToSharedItem, totalItems } from '#core/lib/utils.ts';
import { Item } from '#core/types/core.types.ts';
import { ItemType, SharedItem } from '#shared/types/item.types.ts';

class ItemService {
  private items: Item[] = [];

  totalItems(): number {
    return this.items.length;
  }

  totalFiles(): number {
    return this.items.filter((i) => i.type === 'file').length;
  }

  totalFolders(): number {
    return this.items.filter((i) => i.type === 'folder').length;
  }

  async shareItems(type: ItemType, paths: string[]) {
    for (const path of paths) {
      await this.shareItem(path, type);
    }
  }

  private async shareItem(path: string, type: ItemType) {
    const stats = await stat(path);
    // be sure that item is not shared yet
    if (this.items.find((i) => i.type === type && i.id === stats.ino) === undefined) {
      const baseItem = {
        id: stats.ino,
        path,
      };
      const item: Item =
        type === 'file'
          ? { ...baseItem, type: 'file', bytes: stats.size }
          : { ...baseItem, type: 'folder', totFiles: await totalItems(path) };
      this.items.push(item);
    }
  }

  getSharedItems(): SharedItem[] {
    const sharedItems: SharedItem[] = [];
    for (const item of this.items) {
      const sharedItem = mapItemToSharedItem(item);
      sharedItems.push(sharedItem);
    }
    return sharedItems;
  }

  fileById(id: number): Item | undefined {
    return this.items.find((i) => i.type === 'file' && i.id === id);
  }

  folderById(id: number): Item | undefined {
    return this.items.find((i) => i.type === 'folder' && i.id === id);
  }

  removeShare(type: ItemType, id: number): boolean {
    const index = this.items.findIndex((item) => item.type === type && item.id === id);
    if (index === -1) {
      return false;
    }

    this.items.splice(index, 1);
    return true;
  }
}

export const itemService = new ItemService();
