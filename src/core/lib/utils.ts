import { glob } from 'node:fs/promises';
import { platform } from 'node:os';
import { Item, SupportedOS } from '#core/types/core.types.ts';
import { DesktopOperatingSystem } from '#shared/types/device.types.ts';
import { SharedItem } from '#shared/types/item.types.ts';
import { formatBytes } from '#shared/utils.ts';

export async function totalItems(path: string): Promise<number> {
  const fileIterator = glob('**/*', { cwd: path });
  let totItems = 0;
  for await (const _ of fileIterator) {
    totItems++;
  }
  return totItems;
}

export function osByPlatform(): DesktopOperatingSystem {
  const currentPlatform: 'darwin' | 'linux' | 'win32' = platform() as SupportedOS;
  switch (currentPlatform) {
    case 'darwin':
      return 'macOS';
    case 'linux':
      return 'Linux';
    case 'win32':
      return 'Windows';
  }
}

export function mapItemToSharedItem(item: Item): SharedItem {
  let sharedItem: SharedItem;
  if (item.type === 'file') {
    const fullName = item.path.replace(/^.*[\\\/]/, '');
    sharedItem = {
      id: item.id,
      name: fullName.includes('.') ? fullName.split('.').slice(0, -1).join('.') : fullName,
      type: 'file',
      fullName,
      extension: fullName.includes('.') ? fullName.split('.').pop()! : '',
      size: formatBytes(item.bytes),
      bytes: item.bytes,
    };
  } else {
    sharedItem = {
      id: item.id,
      name: item.path.match(/([^\/\\]*)\/*$/)![1],
      type: 'folder',
      totFiles: item.totFiles,
    };
  }
  return sharedItem;
}
