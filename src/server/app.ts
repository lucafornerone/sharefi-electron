import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { deviceRoutes } from '#server/routes/device.route.ts';
import { itemRoutes } from '#server/routes/item.route.ts';
import { APP_CONFIG } from '#shared/constants.ts';

export const app = new Hono();
app.use('*', cors({ origin: '*' }));

const api = app.basePath(`/${APP_CONFIG.APP_NAME}`);
api.route('/device', deviceRoutes);
api.route('/item', itemRoutes);
