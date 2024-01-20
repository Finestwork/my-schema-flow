import { ipcMain } from 'electron';
import mysql from 'mysql2/promise';
import type { ConnectionOptions } from 'mysql2/promise';

type TDatabaseCreation = ConnectionOptions & {
    customizedDatabase?: string;
    storedDatabase?: string;
};
export default class HandleDatabaseListener {
    private _connection: mysql.Connection | null = null;

    constructor() {
        this._connectMySQL();
        this._runQuery();
        this._createDatabase();
    }

    private _connectMySQL() {
        ipcMain.handle(
            'connectMySQL',
            async (_, options: ConnectionOptions) => {
                try {
                    // Create the connection to database
                    this._connection = await mysql.createConnection({
                        host: options.host,
                        port: options.port,
                        user: options.user,
                        password: options.password,
                    });

                    const DatabaseQuery = 'SHOW DATABASES;';

                    const Databases =
                        await this._connection.query(DatabaseQuery);

                    return {
                        error: null,
                        databases: Databases,
                    };
                } catch (e) {
                    await this._connection?.end();
                    this._connection?.destroy();
                    this._connection = null;
                    return {
                        error: {
                            message: e,
                        },
                    };
                }
            },
        );
    }

    private _createDatabase() {
        ipcMain.handle(
            'createDatabase',
            async (_, options: TDatabaseCreation) => {
                try {
                    if (this._connection === null) {
                        this._connection = await mysql.createConnection({
                            host: options.host,
                            port: options.port,
                            user: options.user,
                            password: options.password,
                        });
                    }

                    const CustomizedDatabase =
                        options?.customizedDatabase ?? '';
                    const StoredDatabase = options?.storedDatabase ?? '';
                    const DatabaseName =
                        CustomizedDatabase !== ''
                            ? CustomizedDatabase
                            : StoredDatabase;

                    if ('customizedDatabase' in options) {
                        // Create the connection to database
                        await this._connection.query(
                            `CREATE DATABASE ${DatabaseName} DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;`,
                        );
                    }

                    await this._connection.end();
                    this._connection.destroy();

                    this._connection = await mysql.createConnection({
                        host: options.host,
                        port: options.port,
                        user: options.user,
                        password: options.password,
                        database: DatabaseName,
                        multipleStatements: true,
                    });

                    return {
                        error: null,
                    };
                } catch (e) {
                    return {
                        error: {
                            message: e,
                        },
                    };
                }
            },
        );
    }

    private _runQuery() {
        ipcMain.handle('runQuery', async (_, query: string) => {
            if (this._connection === null) return;
            try {
                const Result = await this._connection.query(query);
                return {
                    error: null,
                    result: Result,
                };
            } catch (e) {
                return {
                    error: {
                        message: e,
                    },
                };
            }
        });
    }
}
