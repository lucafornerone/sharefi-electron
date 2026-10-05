import { createServer } from 'node:https';
import { serve } from '@hono/node-server';
import { storeService } from '#core/services/StoreService.ts';
import { APP_CONFIG } from '#shared/constants.ts';
import { app } from './app.ts';

export async function openServer() {
  await new Promise((resolve) => {
    serve(
      {
        fetch: app.fetch,
        port: APP_CONFIG.SERVER_PORT,
        createServer,
        serverOptions: {
          key: storeService.getHttpsKey(),
          cert: storeService.getHttpsCert(),
        },
      },
      (info) => {
        console.log(`[CORE] Server is running on port ${info.port}`);
        resolve(true);
      }
    );
  });
}
