import * as initSqlJs from 'sql.js/dist/sql-asm.js';
import { v4 as uuidv4 } from 'uuid';

export const importHelper = async (file: Uint8Array) => {
    const sql = await initSqlJs();

    return new Promise((resolve, reject)=>{
        const db =  new sql.Database(file);
    const database =  db.exec('SELECT tbl_name FROM sqlite_master');
    const dataTypeRegex =  /^(.+?)(?:\((\d+)\))?$/;
    const table_names =  database[0].values.map((value) => value[0]);
    const nodes: { [key: string]: object } = {};
    const edges: object[] = [];
    table_names.forEach((table_name) => {
        const result = db.exec(`PRAGMA table_info(${table_name})`)[0].values;
        const columns: object[] = result.map((row: object) => {
            const dataTypeMatch = dataTypeRegex.exec(row[2]);
            const dataType = dataTypeMatch ? dataTypeMatch[1] : row[2];
            const length = dataTypeMatch ? dataTypeMatch[2] : '';

            const column: object = {
                name: row[1],
                type: dataType,
                isNull: row[3] === 'YES',
                length: length,
                keyConstraint: row[5] === 1 ? 'PK' : '',
                shouldHighlight: false, // Set the appropriate value based on your logic
            };

            return column;
        });

        nodes[table_name] = {
            id: uuidv4(),
            name: table_name,
            columns: columns,
        };

        const foreignKeysResult = db.exec(
            `PRAGMA foreign_key_list(${table_name})`,
        );

        if (foreignKeysResult && foreignKeysResult.length > 0) {
            edges.push(
                ...foreignKeysResult[0].values.map((row: object) => {
                    return {
                        source: {
                            table: table_name,
                            column: row[3],
                        },
                        target: {
                            table: row[2],
                            column: row[4],
                        },
                        constraints: {
                            onDelete: row[5],
                            onUpdate: row[6],
                        },
                    };
                }),
            );
        }
    });

    resolve([nodes, edges])
    });
    
};
