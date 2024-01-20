import { electronAPI } from '@electron-toolkit/preload';
import { contextBridge, ipcRenderer } from 'electron';
import type { ConnectionOptions } from 'mysql2/promise';

// Custom APIs for renderer
const api = {
    toggleDarkMode(isDarkMode: boolean) {
        ipcRenderer.send('toggleDarkMode', isDarkMode);
    },
    saveFile: (contents: string) => ipcRenderer.invoke('saveFile', contents),
    overwriteFileName: (filePath: string, fileName: string) =>
        ipcRenderer.invoke('overwriteFileName', filePath, fileName),
    overwriteFile: (contents: string, filePath: string) =>
        ipcRenderer.invoke('overwriteFile', contents, filePath),
    saveAsScript(script: string, extension: Array<string>) {
        ipcRenderer.send('saveAsScript', script, extension);
    },
    showSaveConfirmationDialog: (message: string, title: string) =>
        ipcRenderer.sendSync('showSaveConfirmationDialog', message, title),
    importSQLScript: (filePath: string) =>
        ipcRenderer.sendSync('importSQLScript', filePath),
    importDiagram: () => ipcRenderer.sendSync('importDiagram'),
    connectMySQL: (options: ConnectionOptions) =>
        ipcRenderer.invoke('connectMySQL', options),
    runQuery: (query: string) => ipcRenderer.invoke('runQuery', query),
    createDatabase: (options: ConnectionOptions) =>
        ipcRenderer.invoke('createDatabase', options),
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld('electron', electronAPI);
        contextBridge.exposeInMainWorld('api', api);
    } catch (error) {
        // TODO: Catch error
    }
} else {
    // @ts-ignore (define in dts)
    window.electron = electronAPI;
    // @ts-ignore (define in dts)
    window.api = api;
}
