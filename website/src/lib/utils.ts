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
  WINDOWS: 'https://apps.microsoft.com/detail/9pgpfk69dz2j',
  MACOS: 'https://apps.apple.com/app/sharefi-lan-file-sharing/id1616201015',
  LINUX_SNAPCRAFT: 'https://snapcraft.io/sharefi-electron',
  LINUX_FLATHUB: 'https://flathub.org/apps/app.sharefi.Sharefi',
  ANDROID: 'https://play.google.com/store/apps/details?id=com.lucafornerone.sharefi',
  IOS: 'https://apps.apple.com/app/sharefi-network-file-sharing/id1620601131',
};

export const BINARY_GROUPS: {
  os: string;
  binaries: { type: string; extension: string; arch: string; url: string }[];
}[] = [
  {
    os: 'Windows',
    binaries: [
      {
        type: 'Portable',
        extension: '.exe',
        arch: 'x64',
        url: `${REPO_URL}/releases/download/v${appVersion()}/Sharefi.${appVersion()}.exe`,
      },
      {
        type: 'Installer',
        extension: '.exe',
        arch: 'x64',
        url: `${REPO_URL}/releases/download/v${appVersion()}/Sharefi.Setup.${appVersion()}.exe`,
      },
    ],
  },
  {
    os: 'macOS',
    binaries: [
      {
        type: 'Portable',
        extension: '.app',
        arch: 'Apple Silicon',
        url: `${REPO_URL}/releases/download/v${appVersion()}/Sharefi-${appVersion()}-arm64-mac.zip`,
      },
      {
        type: 'Installer',
        extension: '.dmg',
        arch: 'Apple Silicon',
        url: `${REPO_URL}/releases/download/v${appVersion()}/Sharefi-${appVersion()}-arm64.dmg`,
      },
    ],
  },
  {
    os: 'Linux',
    binaries: [
      {
        type: 'Installer',
        extension: '.deb',
        arch: 'amd64',
        url: `${REPO_URL}/releases/download/v${appVersion()}/sharefi_${appVersion()}_amd64.deb`,
      },
      {
        type: 'Installer',
        extension: '.deb',
        arch: 'arm64',
        url: `${REPO_URL}/releases/download/v${appVersion()}/sharefi_${appVersion()}_arm64.deb`,
      },
      {
        type: 'Installer',
        extension: '.rpm',
        arch: 'x86_64',
        url: `${REPO_URL}/releases/download/v${appVersion()}/sharefi-${appVersion()}.x86_64.rpm`,
      },
      {
        type: 'Installer',
        extension: '.rpm',
        arch: 'aarch64',
        url: `${REPO_URL}/releases/download/v${appVersion()}/sharefi-${appVersion()}.aarch64.rpm`,
      },
      {
        type: 'Portable',
        extension: '.tar.gz',
        arch: 'x64',
        url: `${REPO_URL}/releases/download/v${appVersion()}/sharefi-${appVersion()}.tar.gz`,
      },
      {
        type: 'Portable',
        extension: '.tar.gz',
        arch: 'arm64',
        url: `${REPO_URL}/releases/download/v${appVersion()}/sharefi-${appVersion()}-arm64.tar.gz`,
      },
    ],
  },
];
