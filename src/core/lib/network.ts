import { platform } from 'node:os';
import { v4DefaultGateway } from 'network-default-gateway';
import { v4LocalDevices } from 'network-local-devices';
import { Agent, setGlobalDispatcher } from 'undici';
import { SupportedOS } from '#core/types/core.types.ts';
import { DeviceNetwork } from '#server/types/network.types.ts';
import type { LocalDevice } from '#shared/types/ipc.types.ts';
import { ConnectionType } from '#shared/types/ipc.types.ts';
import { deviceBaseUrl } from '#shared/utils.ts';

export async function disableSelfSignedErrors() {
  const agent = new Agent({
    connect: { rejectUnauthorized: false },
  });
  setGlobalDispatcher(agent);
}

export async function networkConnectionType(): Promise<ConnectionType> {
  const { interface: int } = await v4DefaultGateway();
  const currentPlatform: 'darwin' | 'linux' | 'win32' = platform() as SupportedOS;
  switch (currentPlatform) {
    case 'darwin':
      return int === 'en0' ? 'wifi' : 'wired';
    case 'linux':
      return int.startsWith('wlan') || int.startsWith('wlp') ? 'wifi' : 'wired';
    case 'win32':
      return int === 'Wi-Fi' ? 'wifi' : 'wired';
  }
}

export async function findDevices(): Promise<LocalDevice[]> {
  // find connected devices to the local network
  const localDevices = await v4LocalDevices({ timeout: 2 });

  const fetchPromises = localDevices.map(async (device) => {
    const url = `${deviceBaseUrl(device.ip)}/device/info`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        signal: AbortSignal.timeout(3_000),
      });

      if (!response.ok) {
        return null;
      }

      const data: DeviceNetwork = await response.json();
      return { ip: device.ip, data };
    } catch (_error: unknown) {
      return null;
    }
  });

  const responses: ({ ip: string; data: DeviceNetwork } | null)[] =
    await Promise.all(fetchPromises);
  const devices: LocalDevice[] = responses
    .filter((d) => d !== null)
    .map((d) => ({ ip: d.ip, name: d.data.name, os: d.data.os }));
  return devices;
}
