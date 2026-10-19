import { ipcMain } from 'electron';
import { showDialogItemSelection } from '#core/lib/utils.ts';
import { itemService } from '#core/services/ItemService.ts';
import { ItemType } from '#shared/types/item.types.ts';
import { Ipc } from './ipc.enum.ts';

export function registerItemSelectionDialogIpc() {
  ipcMain.handle(Ipc.ItemSelectionDialog, async (_event, type: ItemType) => {
    return await showDialogItemSelection(type);
  });
}

export function registerItemSharesIpc() {
  ipcMain.handle(Ipc.ItemShares, async (_event, type: ItemType, paths: string[]) => {
    await itemService.shareItems(type, paths);
  });
}
