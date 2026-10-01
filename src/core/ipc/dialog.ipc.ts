import { dialog, ipcMain } from 'electron';
import { itemService } from '#core/services/ItemService.ts';
import { ItemType } from '#shared/types/item.types.ts';
import { Ipc } from './ipc.enum.ts';

export function registerDialogFileIpc() {
  ipcMain.handle(Ipc.DialogFile, async () => {
    return await openDialogItems('file');
  });
}

export function registerDialogFolderIpc() {
  ipcMain.handle(Ipc.DialogFolder, async () => {
    return await openDialogItems('folder');
  });
}

async function openDialogItems(type: ItemType): Promise<boolean> {
  const result = await dialog.showOpenDialog({
    properties: [type === 'file' ? 'openFile' : 'openDirectory', 'multiSelections'],
  });
  const hasShares = result.filePaths.length > 0;
  if (hasShares) {
    await itemService.shareItems(type, result.filePaths);
  }
  return hasShares;
}
