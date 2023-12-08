import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
    interface Window {
        electron: ElectronAPI;
        api: {
            saveFile(contents: string): void;
            openFile(): void;
        };
    }
}
