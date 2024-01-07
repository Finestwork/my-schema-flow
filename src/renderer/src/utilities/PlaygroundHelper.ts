import { usePlaygroundStore } from '@stores/Playground';
import * as initSqlJs from 'sql.js/dist/sql-asm.js';
import { Database } from 'sql.js/dist/sql-asm.js';



export const initializeDatabase = async (statement: string) => {
    const sql = await initSqlJs();
    const db = new sql.Database();
    db.run(statement);
    return db;
};


export const initializeImportedDatabase = async (file: Buffer) => {
    const sql = await initSqlJs();
    const db = new sql.Database(file);
    return db;
};

export const executeStatement = async(
    db: Database,
    statement: string,
    currentTable: string,
) => {
    const playgroundStore = usePlaygroundStore();
    if (statement === '') {
        return [];
    }
    const sqlStatementRegex = /\b(INSERT|UPDATE|DELETE)\b/gi;
    const isCUD = sqlStatementRegex.test(statement);
    try {
        const result = await db.exec(statement);
        if (isCUD) {
            return db.exec(`SELECT * FROM ${currentTable}`);
            playgroundStore.result = result; // update the currentRows if Create Update or Delete
            return [] // return no errors 
        } else {
            playgroundStore.result = result; // return the resulting query if Select
            return [] // return no errors
        }
    } catch (error) {
        return [error]
    }
};

export const getTableList = (db: Database) => {
    const result = db.exec('SELECT name FROM sqlite_master WHERE type="table"');
    return result;
};

export const getColumns = (db: Database, currentTable: string) => {
    if (currentTable === '') {
        return [];
    }
    const columns = db
        .exec(`PRAGMA table_info(${currentTable})`)[0]
        .values.map((column: object) => column[1]);

    return columns;
};

export const getRows = (db: Database, result: any) => {
    if (result.length === 0) {
        return [];
    } else {
        return result[0]?.values.map((row: object) => row);
    }
};
