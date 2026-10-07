import { APP_CONFIG } from '#shared/constants.ts';
import type { ItemType, SharedItem } from '#shared/types/item.types.ts';
import { deviceBaseUrl } from '#shared/utils.ts';

const ENDPOINT = 'item';

export async function getSharedItems(ip: string): Promise<SharedItem[]> {
  const url = `${deviceBaseUrl(ip)}/${ENDPOINT}/get`;
  const response = await fetch(url, {
    method: 'GET',
    signal: AbortSignal.timeout(APP_CONFIG.API_TIMEOUT),
  });
  return await response.json();
}

export async function streamItem(
  ip: string,
  type: ItemType,
  id: number,
  name: string,
  signal: AbortSignal
) {
  const url = `${deviceBaseUrl(ip)}/${ENDPOINT}/stream${type === 'file' ? 'File' : 'Folder'}`;
  return await fetch(url, {
    signal,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, name }),
  });
}
