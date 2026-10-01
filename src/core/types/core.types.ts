interface BaseItem {
  id: number;
  path: string;
}

interface FileItem extends BaseItem {
  type: 'file';
  bytes: number;
}

interface FolderItem extends BaseItem {
  type: 'folder';
  totFiles: number;
}

export type Item = FileItem | FolderItem;

export enum SupportedOS {
  Linux = 'linux',
  MacOS = 'darwin',
  Windows = 'win32',
}
