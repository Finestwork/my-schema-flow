import { ipcMain, BrowserWindow, dialog } from 'electron';
import { writeFile, readFile } from 'fs/promises';
import { basename } from 'path';
import IpcMainEvent = Electron.IpcMainEvent;

export default class EventListeners {
    constructor() {
        this._saveFile();
        this._overwriteFile();
        this._openFile();
    }

    /**
     * Saves a file by listening to the 'saveFile' event.
     */
    private _saveFile() {
        ipcMain.on('saveFile', async (event, contents) => {
            const CurrentBrowserWindow = BrowserWindow.fromWebContents(
                event.sender,
            );
            if (!CurrentBrowserWindow) return;

            const DialogOptions = {
                title: 'Exporting a File',
                filters: [{ name: 'spark', extensions: ['ss'] }],
            };
            const Result = await dialog.showSaveDialog(
                CurrentBrowserWindow,
                DialogOptions,
            );
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

    private _overwriteFile() {
        ipcMain.on(
            'overwriteFile',
            async (event: IpcMainEvent, contents: string, filePath: string) => {
                const CurrentBrowserWindow = BrowserWindow.fromWebContents(
                    event.sender,
                );
                if (!CurrentBrowserWindow) return;

                await writeFile(filePath, contents);
                CurrentBrowserWindow.webContents.send(
                    'fileOverwroteSuccessfully',
                );
            },
        );
    }

    private _openFile() {
        ipcMain.on('openFile', async (event) => {
            const CurrentBrowser = BrowserWindow.fromWebContents(event.sender);
            if (!CurrentBrowser) return;

            const DialogOptions = {
                title: 'Importing a File',
                filters: [{ name: 'spark', extensions: ['ss'] }],
            };
            const Result = await dialog.showOpenDialog(
                CurrentBrowser,
                DialogOptions,
            );
            if (Result.canceled) return;
            if (!Result.filePaths) return;

            const File = await readFile(Result.filePaths[0], {
                encoding: 'utf-8',
            });
            CurrentBrowser.webContents.send(
                'filedOpened',
                File,
                Result.filePaths,
                basename(Result.filePaths[0]),
            );
        });
    }
}
