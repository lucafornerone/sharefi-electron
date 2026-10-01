export type ItemType = 'file' | 'folder';

interface BaseSharedItem {
  id: number;
  name: string;
}

interface SharedFileItem extends BaseSharedItem {
  type: 'file';
  fullName: string;
  extension: string;
  size: string;
  bytes: number;
  totFiles?: never;
}

interface SharedFolderItem extends BaseSharedItem {
  type: 'folder';
  totFiles: number;
  fullName?: never;
  extension?: never;
  size?: never;
  bytes?: never;
}

export type SharedItem = SharedFileItem | SharedFolderItem;
