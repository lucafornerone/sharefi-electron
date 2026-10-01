import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import pkgRelease from '../../../dist/release/package.json';
import pkg from '../../../package.json';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const appVersion = () => {
  return pkgRelease.version;
};

export const electronMajorVersion = () => {
  return pkg.devDependencies.electron.split('.').slice(0, 1).join('.');
};

export const REPO_URL = 'https://github.com/lucafornerone/sharefi-electron';
export const STORE_URLS = {
  WINDOWS: 'https://www.microsoft.com/store/productId/9PGPFK69DZ2J',
  MACOS: 'https://apps.apple.com/us/app/sharefi-lan-file-sharing/id1616201015',
  LINUX: 'https://snapcraft.io/sharefi-electron',
  ANDROID: 'https://play.google.com/store/apps/details?id=com.lucafornerone.sharefi',
  IOS: 'https://apps.apple.com/us/app/sharefi-network-file-sharing/id1620601131',
};
