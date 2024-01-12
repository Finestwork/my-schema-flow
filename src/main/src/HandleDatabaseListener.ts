import { ipcMain } from 'electron';
import mysql from 'mysql2/promise';
import type { TMySQLConnection } from '../../preload';

export default class HandleDatabaseListener {
    private _connection: mysql.Connection | null = null;

    constructor() {
        this._connectMySQL();
        this._runQuery();
        this._createDatabase();
    }

    private _connectMySQL() {
        ipcMain.handle('connectMySQL', async (_, options: TMySQLConnection) => {
            try {
                // Create the connection to database
                this._connection = await mysql.createConnection({
                    host: options.host,
                    port: options.port,
                    user: options.user,
                    password: options.password,
                });

                return {
                    error: null,
                };
            } catch (e) {
                this._connection = null;
                return {
                    error: {
                        message: e,
                    },
                };
            }
        });
    }

    private _createDatabase() {
        ipcMain.handle(
            'createDatabase',
            async (_, options: TMySQLConnection) => {
                try {
                    if (this._connection === null) {
                        this._connection = await mysql.createConnection({
                            host: options.host,
                            port: options.port,
                            user: options.user,
                            password: options.password,
                        });
                    }

                    // Create the connection to database
                    await this._connection.query(
                        `CREATE DATABASE ${options.database} DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;`,
                    );

                    await this._connection.end();

                    this._connection = await mysql.createConnection({
                        host: options.host,
                        port: options.port,
                        user: options.user,
                        password: options.password,
                        database: options.database,
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
            const Result = await this._connection.query(query);
            return Result;
        });
    }
}
