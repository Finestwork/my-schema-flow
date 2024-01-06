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
