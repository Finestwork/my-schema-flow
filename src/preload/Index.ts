import { electronAPI } from '@electron-toolkit/preload';
import { contextBridge, ipcRenderer } from 'electron';

// Custom APIs for renderer
const api = {
    saveFile(contents) {
        ipcRenderer.send('saveFile', contents);
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
