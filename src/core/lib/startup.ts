import { registerIpcs } from '#core/ipc/index.ipc.ts';
import { storeService } from '#core/services/StoreService.ts';
import { openServer } from '#server/index.ts';
import { disableSelfSignedErrors } from './network.ts';

export async function initializeApp() {
  // initialize electron store for data persistence
  await storeService.initialize();
  // create hono server for http requests
  await openServer();
  // register ipcs for core <-> ui bridge
  registerIpcs();
  // ignore other devices' self signed certificate error
  disableSelfSignedErrors();
}
