import { ElectronAPI } from '@electron-toolkit/preload';
import {
    ProcedureCallPacket,
    ResultSetHeader,
    RowDataPacket,
} from 'mysql2/typings/mysql/lib/protocol/packets';

export type TMySQLConnection = {
    host: string;
    port: string;
    user: string;
    password: string;
    database?: string;
    customizedDatabase?: string;
    storedDatabase?: string;
};

export type TMysqlReturnedData =
    | ResultSetHeader
    | ResultSetHeader[]
    | RowDataPacket[]
    | RowDataPacket[][]
    | ProcedureCallPacket;

export type TMySQLConnectionReturn = {
    result: TMysqlReturnedData | null;
    error: {
        message: string;
    } | null;
    databases?: Array<RowDataPacket>;
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
            showSaveConfirmationDialog(
                message: string,
                title: string,
            ): -1 | 0 | 1;
            importSQLScript(): Promise<string | null>;
            importDiagram(): Promise<{
                contents: string;
                filePath: string;
                fileName: string;
            } | null>;
            connectMySQL(
                options: Omit<TMySQLConnection, 'database'>,
            ): Promise<TMySQLConnectionReturn>;
            runQuery(query: string): Promise<TMySQLConnectionReturn>;
            createDatabase(
                options: TMySQLConnection,
            ): Promise<TMySQLConnectionReturn>;
        };
    }
}
