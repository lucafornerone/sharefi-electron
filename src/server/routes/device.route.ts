import { Hono } from 'hono';
import { osByPlatform } from '#core/lib/utils.ts';
import { itemService } from '#core/services/ItemService.ts';
import { storeService } from '#core/services/StoreService.ts';
import { DeviceNetwork } from '#server/types/network.types.ts';

export const deviceRoutes = new Hono();

/**
 * @deprecated This method is deprecated.
 */
deviceRoutes.get('/ping', (c) => {
  return c.json(true);
});

deviceRoutes.get('/info', (c) => {
  const response: DeviceNetwork = {
    name: storeService.getName(),
    os: osByPlatform(),
    items: itemService.totalItems(),
  };
  return c.json<DeviceNetwork>(response);
});
