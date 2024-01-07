import * as initSqlJs from 'sql.js/dist/sql-asm.js';
import { Database } from 'sql.js/dist/sql-asm.js';

export const initializeDatabase = async (statement: string) => {
    const sql = await initSqlJs();
    const db = new sql.Database();
    db.run(statement);
    return db;
}


export const executeStatement = (db: Database, statement: string) => {
    const result = db.exec(statement);
    return result;
}


export const getTableList = (db: Database) => {
    const result = db.exec('SELECT name FROM sqlite_master WHERE type="table"');
    return result;
}



export const getColumns = (db: Database, currentTable: string) => {
    const columns = db.exec(`PRAGMA table_info(${playgroundStore.currentTable})`)[0].values.map((column: any) => column[1]);

    return columns;
}