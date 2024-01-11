import { ipcMain } from 'electron';
import mysql from 'mysql2/promise';
import type { TMySQLConnection } from '../../preload';

export default class HandleDatabaseListener {
    private _connection: mysql.Connection | null = null;

    constructor() {
        this._connectMySQL();
        this._runQuery();
    }

    private _connectMySQL() {
        ipcMain.handle('connectMySQL', async (_, options: TMySQLConnection) => {
            try {
                // Create the connection to database
                // this._connection = await mysql.createConnection({
                //     host: options.host,
                //     port: options.port,
                //     user: options.user,
                //     password: options.password,
                //     multipleStatements: true,
                // });

                this._connection = await mysql.createConnection({
                    host: 'localhost',
                    port: '',
                    user: 'root',
                    password: '12345',
                    multipleStatements: true,
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

    private _runQuery() {
        ipcMain.handle('runQuery', async (_, query: string) => {
            if (this._connection === null) return;
            const Result = await this._connection.query(query);
            return Result;
        });
    }
}
