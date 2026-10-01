import { createReadStream, ReadStream } from 'node:fs';
import { Readable } from 'node:stream';
import { ZipArchive } from 'archiver';
import { type Context } from 'hono';
import { stream } from 'hono/streaming';
import mime from 'mime';
import { mapItemToSharedItem } from '#core/lib/utils.ts';
import { itemService } from '#core/services/ItemService.ts';
import { Item } from '#core/types/core.types.ts';
import { APP_CONFIG } from '#shared/constants.ts';
import { ItemType } from '#shared/types/item.types.ts';

export function streamItemToClient(c: Context, type: ItemType, id: number): Response {
  const item = type === 'file' ? itemService.fileById(id) : itemService.folderById(id);
  if (!item) {
    return c.json({ error: 'Item not found' }, 404);
  }

  let itemStream: ReadStream | ZipArchive;
  if (type === 'file') {
    const file = mapItemToSharedItem(item);
    const contentType = mime.getType(item.path);
    itemStream = createReadStream(item.path);
    c.header('Content-Type', contentType ?? 'application/octet-stream');
    c.header('Content-Length', `${file.bytes}`);
  } else {
    itemStream = new ZipArchive();
    itemStream.directory(item.path, false);
    itemStream.finalize();
    c.header('Content-Type', `application/${APP_CONFIG.ARCHIVE_EXTENSION}`);
  }

  const webStream = Readable.toWeb(itemStream);
  return stream(c, async (honoStream) => {
    honoStream.onAbort(() => {
      itemStream.destroy();
    });

    // @ts-expect-error: typescript confuses web standard ReadableStream with node:stream/web one
    await honoStream.pipe(webStream);
  });
}

/**
 * @deprecated This method is deprecated.
 */
export function streamZipToClient(
  c: Context,
  itemsToZip: { type: ItemType; id: number }[]
): Response {
  const items: Item[] = [];
  for (const itemToZip of itemsToZip) {
    const id = itemToZip.id;
    const item = itemToZip.type === 'file' ? itemService.fileById(id) : itemService.folderById(id);
    if (item) {
      items.push(item);
    }
  }
  if (items.length === 0) {
    return c.json({ error: 'Items not found' }, 404);
  }

  // zip files and folders
  const archive = new ZipArchive();
  for (const item of items) {
    const sharedItem = mapItemToSharedItem(item);
    if (item.type === 'file') {
      archive.file(item.path, { name: sharedItem.fullName! });
    } else {
      archive.directory(item.path, sharedItem.name);
    }
  }
  archive.finalize();
  c.header('Content-Type', `application/${APP_CONFIG.ARCHIVE_EXTENSION}`);

  const webStream = Readable.toWeb(archive);
  return stream(c, async (honoStream) => {
    honoStream.onAbort(() => {
      archive.destroy();
    });

    // @ts-expect-error: typescript confuses web standard ReadableStream with node:stream/web one
    await honoStream.pipe(webStream);
  });
}
