import { BrowserWindow, dialog, ipcMain } from 'electron';
import { readFile, rename, writeFile } from 'fs/promises';
import { basename, dirname } from 'path';
import IpcMainInvokeEvent = Electron.IpcMainInvokeEvent;

export default class HandleEventListeners {
    constructor() {
        this._toggleDarkMode();
        this._saveFile();
        this._overwriteFileName();
        this._overwriteFile();
        this._openFile();
        this._saveAsScript();
        this._importDatabaseFile();
        this._importSQLScript();
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
        ipcMain.handle('saveFile', async (event, contents) => {
            const CurrentBrowserWindow = BrowserWindow.fromWebContents(
                event.sender,
            );
            if (!CurrentBrowserWindow) return;

            const DialogOptions = {
                title: 'Exporting a File',
                filters: [{ name: 'MySchemaFlow', extensions: ['msf'] }],
            };
            const Result = await dialog.showSaveDialog(
                CurrentBrowserWindow,
                DialogOptions,
            );
            if (Result.canceled || !Result.filePath) {
                return null;
            }

            await writeFile(Result.filePath, contents);

            return {
                filePath: Result.filePath,
                fileName: basename(Result.filePath),
            };
        });
    }

    private _overwriteFileName() {
        ipcMain.handle(
            'overwriteFileName',
            async (
                event: IpcMainInvokeEvent,
                filePath: string,
                fileName: string,
            ) => {
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

                    return {
                        filePath: NewFilePath,
                        fileName: basename(`${fileName}.ss`),
                    };
                } catch (err) {
                    return {};
                }
            },
        );
    }

    private _overwriteFile() {
        ipcMain.handle(
            'overwriteFile',
            async (
                event: IpcMainInvokeEvent,
                contents: string,
                filePath: string,
            ) => {
                const CurrentBrowserWindow = BrowserWindow.fromWebContents(
                    event.sender,
                );
                filePath = JSON.parse(filePath);
                if (!CurrentBrowserWindow) return;
                await writeFile(filePath[0], contents);
            },
        );
    }

    private _openFile() {
        ipcMain.on('openFile', async (event) => {
            const CurrentBrowser = BrowserWindow.fromWebContents(event.sender);
            if (!CurrentBrowser) return;

            const DialogOptions = {
                title: 'Importing a File',
                filters: [{ name: 'MySchemaFlow', extensions: ['msf'] }],
            };
            const Result = await dialog.showOpenDialog(
                CurrentBrowser,
                DialogOptions,
            );
            if (Result.canceled || (Result && !Result.filePaths)) {
                event.returnValue = null;
                return;
            }

            const File = await readFile(Result.filePaths[0], {
                encoding: 'utf-8',
            });

            event.returnValue = {
                contents: File,
                filePath: Result.filePaths,
                baseName: basename(Result.filePaths[0]),
            };
        });
    }

    private _importDatabaseFile() {
        ipcMain.on('importDatabaseFile', async (event) => {
            const CurrentBrowser = BrowserWindow.fromWebContents(event.sender);
            if (!CurrentBrowser) return;

            const DialogOptions = {
                title: 'Importing a File',
                filters: [
                    {
                        name: 'database',
                        extensions: ['sqlite3', 'sqlite', 'database', 'db'],
                    },
                ],
            };
            const Result = await dialog.showOpenDialog(
                CurrentBrowser,
                DialogOptions,
            );
            if (Result.canceled || (Result && !Result.filePaths)) {
                event.returnValue = null;
                return;
            }
            event.returnValue = await readFile(Result.filePaths[0]);
        });
    }

    private _importSQLScript() {
        ipcMain.on('importSQLScript', async (event) => {
            const CurrentBrowser = BrowserWindow.fromWebContents(event.sender);
            if (!CurrentBrowser) return;

            const DialogOptions = {
                title: 'Importing SQL / DDL',
                filters: [
                    {
                        name: 'sql/ddl',
                        extensions: ['sql', 'ddl'],
                    },
                ],
            };
            const Result = await dialog.showOpenDialog(
                CurrentBrowser,
                DialogOptions,
            );
            if (Result.canceled || (Result && !Result.filePaths)) {
                event.returnValue = null;
                return;
            }
            const File = await readFile(Result.filePaths[0]);
            event.returnValue = File.toString();
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

                await writeFile(Result.filePath, script);
            },
        );
    }
}
