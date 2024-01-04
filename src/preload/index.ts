import { electronAPI } from '@electron-toolkit/preload';
import { contextBridge, ipcRenderer } from 'electron';

// Custom APIs for renderer
const api = {
    toggleDarkMode(isDarkMode: boolean) {
        ipcRenderer.send('toggleDarkMode', isDarkMode);
    },
    saveFile(contents: string) {
        ipcRenderer.send('saveFile', contents);
    },
    overwriteFileName(filePath: string, fileName: string) {
        ipcRenderer.send('overwriteFileName', filePath, fileName);
    },
    overwriteFile(contents: string, filePath: string) {
        ipcRenderer.send('overwriteFile', contents, filePath);
    },
    saveAsScript(script: string, extension: Array<string>) {
        ipcRenderer.send('saveAsScript', script, extension);
    },
    openSchema(filePath: string) {
        ipcRenderer.send('openSchema', filePath);
    },
    openDDL(filePath: string) {
        ipcRenderer.send('openDDL', filePath);
    },
    openFile() {
        ipcRenderer.send('openFile');
    },
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
