import { ElectronAPI } from '@electron-toolkit/preload';
import type { Connection } from 'mysql2';

export type TMySQLConnection = {
    host: string;
    port: string;
    user: string;
    password: string;
};
export type TMySQLConnectionReturn = {
    error: {
        message: string;
    } | null;
};

declare global {
    interface Window {
        electron: ElectronAPI;
        api: {
            toggleDarkMode(isDarkMode: boolean): void;
            saveFile(
                contents: string,
            ): Promise<{ filePath: string; fileName: string } | null>;
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
            connectMySQL(
                options: TMySQLConnection,
            ): Promise<TMySQLConnectionReturn>;
            runQuery(query: string): Promise<void>;
        };
    }
}
