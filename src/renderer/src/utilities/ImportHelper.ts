import * as initSqlJs from 'sql.js/dist/sql-asm.js';
import { TEdge, TNode } from '@stores/Canvas';
import { v4 as uuidv4 } from 'uuid';

export const importHelper = async (file: Uint8Array) => {
    const sql = await initSqlJs();
    const db = new sql.Database(file);
    const database = db.exec('SELECT tbl_name FROM sqlite_master');
    const dataTypeRegex = /^(.+?)(?:\((\d+)\))?$/;
    const table_names = database[0].values.map((value) => value[0]);
    const nodes: { [key: string]: object } = {};
    const edges: object[] = [];
    table_names.map((table_name) => {
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
                    };
                }),
            );
        }
    });

    const realnodes = await createNodes(nodes);
    const realedges = await createEdges(edges, nodes);
    return [realnodes, realedges];
};

const createNodes = (NodeDummy): Array<TNode> => {
    const Elements: Array<TNode> = [];
    let index = 1;
    for (const table in NodeDummy) {
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

const createEdges = (EdgesDummy, NodeDummy) => {
    const Edges: Array<TEdge> = [];
    EdgesDummy.forEach((edge) => {
        // set key constraint for the source
        const foreignKey = NodeDummy[edge.source.table].columns.find(
            (column) => column.name === edge.source.column,
        );
        foreignKey.keyConstraint = 'FK';
        const EdgeObj = {
            id: uuidv4(),
            source: NodeDummy[edge.source.table].id,
            target: NodeDummy[edge.target.table].id,
            data: {
                referenced: {
                    column: edge.source.column,
                },
                referencing: {
                    column: edge.target.column,
                },
                constraint: {
                    onDelete: 'NO ACTION',
                    onUpdate: 'NO ACTION',
                },
            },
        };

        Edges.push(EdgeObj as TEdge);
    });
    return Edges;
};
