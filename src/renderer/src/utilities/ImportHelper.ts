import * as initSqlJs from 'sql.js/dist/sql-asm.js';
import { TEdge, TTableColumn, TNode, TNodeData } from '@stores/Canvas';
import { v4 as uuidv4 } from 'uuid';

export const importHelper = async (file: Uint8Array) => {
    const sql = await initSqlJs();
    const db = new sql.Database(file);
    const database = db.exec('SELECT tbl_name FROM sqlite_master');
    const dataTypeRegex = /^(.+?)(?:\((\d+)\))?$/;
    const table_names = database[0].values.map((value) => value[0]);
    const nodes: { [key: string]: any } = {};

    table_names.forEach((table_name) => {
        const result = db.exec(`PRAGMA table_info(${table_name})`)[0].values;
        const columns: any[] = result.map((row: any) => {
            const dataTypeMatch = dataTypeRegex.exec(row[2]);
            const dataType = dataTypeMatch ? dataTypeMatch[1] : row[2];
            const length = dataTypeMatch ? dataTypeMatch[2] : '';

            const column: any = {
                name: row[1],
                type: dataType,
                isNull: row[3] === 'YES',
                length: length,
                keyConstraint: row[5],
                shouldHighlight: false, // Set the appropriate value based on your logic
            };

            return column;
        });

        nodes[table_name] = {
            id: uuidv4(),
            name: table_name,
            columns: columns,
        };
    });
    const realnodes = createNodes(nodes);
    return realnodes;

};

const createNodes = (NodeDummy): Array<TNode> => {
    const Elements: Array<TNode> = [];
    let index = 1;
    for (const table in NodeDummy) {
        console.log(NodeDummy[table][0]);
        const NewObject = {
            id: NodeDummy[table].id,
            type: 'custom',
            connectable: false,
            position: { x: 270 * index, y: 5 },
            data: {
                table: {
                    name: NodeDummy[table].name,
                    columns: NodeDummy[table].columns,
                },
                states: {
                    isActive: false,
                    isFaded: false,
                },
            },
        };
        Elements.push(NewObject as TNode);
        index++;
    }
    return Elements;
};
