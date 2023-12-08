import { ipcMain, BrowserWindow, dialog } from 'electron';
import { writeFile } from 'fs/promises';
import { basename } from 'path';

export default class EventListeners {
    constructor() {
        this.saveFile();
    }

    private saveFile() {
        ipcMain.on('saveFile', async (event, contents) => {
            const CurrentBrowserWindow = BrowserWindow.fromWebContents(event.sender);
            if (!CurrentBrowserWindow) return;

            const DialogOptions = {
                title: 'Exporting File',
                filters: [{ name: 'spark', extensions: ['ss'] }],
            };
            const Result = await dialog.showSaveDialog(CurrentBrowserWindow, DialogOptions);
            if (Result.canceled) return;
            if (!Result.filePath) return;
            await writeFile(Result.filePath, contents);

            CurrentBrowserWindow.webContents.send(
                'fileSavedSuccessfully',
                Result.filePath,
                basename(Result.filePath),
            );
        });
    }
}
