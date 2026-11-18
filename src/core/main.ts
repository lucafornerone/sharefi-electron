import { join } from 'node:path';
import { BrowserWindow } from 'electron';
import { initializeApp } from '#core/lib/startup.ts';
import { windowBackgroundColor } from '#core/lib/utils.ts';

function createWindow(): BrowserWindow {
  const win = new BrowserWindow({
    width: 860,
    height: 720,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: windowBackgroundColor(),
    show: false,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
    },
  });
  win.loadFile('./ui/index.html');
  win.removeMenu();
  return win;
}

initializeApp(createWindow);
