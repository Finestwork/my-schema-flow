import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
    interface Window {
        electron: ElectronAPI;
        api: {
            saveFile(contents: string): void;
            overwriteFile(contents: string, filePath: string): void;
            openFile(): void;
        };
    }
}
