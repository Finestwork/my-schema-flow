import { ipcMain, BrowserWindow, dialog } from 'electron';
import { writeFile, readFile, rename } from 'fs/promises';
import { basename, dirname } from 'path';
import IpcMainEvent = Electron.IpcMainEvent;

export default class HandleEventListeners {
    constructor() {
        this._toggleDarkMode();
        this._saveFile();
        this._overwriteFileName();
        this._overwriteFile();
        this._openFile();
        this._saveAsScript();
    }

    private _toggleDarkMode() {
        ipcMain.on('toggleDarkMode', (event, isDarkMode) => {
            const CurrentBrowserWindow = BrowserWindow.fromWebContents(
                event.sender,
            );
            if (!CurrentBrowserWindow) return;

            if (isDarkMode) {
                CurrentBrowserWindow.setTitleBarOverlay({
                    color: '#090B10',
                    symbolColor: '#8695BB',
                });
                return;
            }
            CurrentBrowserWindow.setTitleBarOverlay({
                color: '#0f172a',
                symbolColor: '#64748b',
            });
        });
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

    private _overwriteFileName() {
        ipcMain.on(
            'overwriteFileName',
            async (event: IpcMainEvent, filePath: string, fileName: string) => {
                const CurrentBrowserWindow = BrowserWindow.fromWebContents(
                    event.sender,
                );
                if (!CurrentBrowserWindow) return;

                try {
                    // Get directory of the current file
                    const CurrentDir = dirname(filePath);

                    // Rename the file
                    const NewFilePath = `${CurrentDir}/${fileName}.ss`;
                    await rename(filePath, NewFilePath);

                    CurrentBrowserWindow.webContents.send(
                        'fileNameOverwriteSuccessfully',
                        NewFilePath,
                        basename(`${fileName}.ss`),
                    );
                } catch (err) {
                    CurrentBrowserWindow.webContents.send('cantUpdateFileName');
                }
            },
        );
    }

    private _overwriteFile() {
        ipcMain.on(
            'overwriteFile',
            async (event: IpcMainEvent, contents: string, filePath: string) => {
                const CurrentBrowserWindow = BrowserWindow.fromWebContents(
                    event.sender,
                );
                filePath = JSON.parse(filePath);
                if (!CurrentBrowserWindow) return;
                await writeFile(filePath[0], contents);
                CurrentBrowserWindow.webContents.send(
                    'fileOverwriteSuccessfully',
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
            event.reply(
                'filedOpened',
                File,
                Result.filePaths,
                basename(Result.filePaths[0]),
            );
        });
    }

    private _saveAsScript() {
        ipcMain.on(
            'saveAsScript',
            async (event, script: string, extension: Array<string>) => {
                const CurrentBrowserWindow = BrowserWindow.fromWebContents(
                    event.sender,
                );
                if (!CurrentBrowserWindow) return;

                const DialogOptions = {
                    title: 'Exporting a File',
                    filters: [{ name: 'sql', extensions: [...extension] }],
                };
                const Result = await dialog.showSaveDialog(
                    CurrentBrowserWindow,
                    DialogOptions,
                );
                if (Result.canceled) return;
                if (!Result.filePath) return;

                writeFile(Result.filePath, script);
            },
        );
    }
}
