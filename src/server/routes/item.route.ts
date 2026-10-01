import { Hono } from 'hono';
import { itemService } from '#core/services/ItemService.ts';
import { streamItemToClient, streamZipToClient } from '#server/lib/stream.ts';
import { ItemType, SharedItem } from '#shared/types/item.types.ts';

export const itemRoutes = new Hono();

itemRoutes.get('/get', (c) => {
  const sharedItems = itemService.getSharedItems();
  return c.json<SharedItem[]>(sharedItems);
});

/**
 * @deprecated This method is deprecated. Use `/stream-file` instead.
 */
itemRoutes.post('/streamFile', async (c) => {
  const body = await c.req.json<{ id: number }>();
  return streamItemToClient(c, 'file', body.id);
});

itemRoutes.get('/stream-file/:id', (c) => {
  const id = c.req.param('id');
  return streamItemToClient(c, 'file', Number(id));
});

/**
 * @deprecated This method is deprecated. Use `/stream-folder` instead.
 */
itemRoutes.post('/streamFolder', async (c) => {
  const body = await c.req.json<{ id: number }>();
  return streamItemToClient(c, 'folder', body.id);
});

itemRoutes.get('/stream-folder/:id', async (c) => {
  const id = c.req.param('id');
  return streamItemToClient(c, 'folder', Number(id));
});

/**
 * @deprecated This method is deprecated.
 */
itemRoutes.post('/streamZip', async (c) => {
  const body = await c.req.json<{ items: { type: ItemType; id: number }[] }>();
  return streamZipToClient(c, body.items);
});
