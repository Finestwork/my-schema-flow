import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
    interface Window {
        electron: ElectronAPI;
        api: {
            toggleDarkMode(isDarkMode: boolean): void;
            saveFile(
                contents: string,
            ): Promise<{ filePath: string; fileName: string }>;
            overwriteFileName(
                currentFilePath: string,
                fileName: string,
            ): Promise<{
                filePath?: string;
                fileName?: string;
            }>;
            overwriteFile(contents: string, filePath: string): Promise<void>;
            saveAsScript(script: string, extension: Array<string>): void;
            importDatabaseFile(): Promise<Buffer | nukk>;
            importSQLScript(): Promise<string | null>;
            importDiagram(): Promise<{
                contents: string;
                filePath: string;
                fileName: string;
            } | null>;
        };
    }
}
