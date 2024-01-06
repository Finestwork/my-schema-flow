import * as initSqlJs from 'sql.js/dist/sql-asm.js';
import { v4 as uuidv4 } from 'uuid';
import { Parser } from 'sql-ddl-to-json-schema';
import type { TTableColumn } from '@stores/Canvas';

export type TGeneratedNodeData = {
    id: string;
    name: string;
    columns: Array<Omit<TTableColumn, 'id'>>;
};

export type TGeneratedEdgeData = {
    source: {
        table: string;
        column: string;
    };
    target: {
        table: string;
        column: string;
    };
    constraints: {
        onDelete: string;
        onUpdate: string;
    };
};

type TDatabaseTableNames = {
    columns: Array<string>;
    values: Array<Array<string>>;
};

export const readImportedDatabaseFile = async (file: Buffer) => {
    const sql = await initSqlJs();
    const SQLDatabaseInstance = new sql.Database(file);
    const DatabaseTableNames: Array<TDatabaseTableNames> =
        SQLDatabaseInstance.exec('SELECT tbl_name FROM sqlite_master');
    const DataTypeRegex = /^(.+?)(?:\((\d+)\))?$/;
    const TableNames = DatabaseTableNames[0].values.map((value) => value[0]);
    const Nodes: Array<TGeneratedNodeData> = TableNames.map((tableName) => {
        type TRow = [number, string, string, number, null, number];
        const ColumnValues: Array<TRow> = SQLDatabaseInstance.exec(
            `PRAGMA table_info(${tableName})`,
        )[0].values;

        const MapColumnValues = (row: TRow) => {
            const DataTypeMatch = DataTypeRegex.exec(row[2]);
            const ColumnDataType =
                DataTypeMatch && DataTypeMatch[1] ? DataTypeMatch[1] : row[2];
            const ColumnLength =
                DataTypeMatch && DataTypeMatch[2] ? DataTypeMatch[2] : '';
            const ColumnKeyConstraint = row[5] === 1 ? 'PK' : '';

            return {
                name: row[1],
                type: ColumnDataType,
                isNull: row[3] === null,
                length: ColumnLength,
                keyConstraint: ColumnKeyConstraint,
                shouldHighlight: false,
            };
        };
        const Columns: Array<Omit<TTableColumn, 'id'>> =
            ColumnValues.map(MapColumnValues);

        return {
            id: uuidv4(),
            name: tableName,
            columns: Columns,
        };
    })
        // Remove duplicate tables
        .filter(
            (node, ind, arr) =>
                arr.findIndex((n) => n.name === node.name) === ind,
        );
    const Edges: Array<TGeneratedEdgeData> = TableNames.map((tableName) => {
        const ForeignKeyResult = SQLDatabaseInstance.exec(
            `PRAGMA foreign_key_list(${tableName})`,
        );

        if (ForeignKeyResult.length > 0) {
            return ForeignKeyResult[0].values.map((row: Array<string>) => {
                return {
                    source: {
                        table: tableName,
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
            });
        }
        return [];
    })
        .filter((edges) => edges.length > 0)
        .flat();

    return {
        nodes: Nodes,
        edges: Edges,
    };
};

export const importDDL = (script: string) => {
    const MySQLParser = new Parser('mysql');
    const JSONSchema = MySQLParser.feed(script).toCompactJson(
        MySQLParser.results,
    );

    const Nodes = JSONSchema.map((table): TGeneratedNodeData => {
        const PrimaryKey = table.primaryKey
            ? table.primaryKey?.columns ?? []
            : [];
        const TableColumns = table?.columns ?? [];
        const Columns = TableColumns.map((row): Omit<TTableColumn, 'id'> => {
            return {
                name: row.name,
                type: row.type.datatype.toUpperCase(),
                isNull: row?.options?.nullable ?? true,
                keyConstraint: PrimaryKey.includes(row.name) ? 'PK' : '',
                shouldHighlight: false,
            };
        });

        return {
            id: uuidv4(),
            name: table.name,
            columns: Columns,
        };
    });
    const Edges = JSONSchema.map((table): Array<TGeneratedEdgeData> => {
        // define the edges
        if (!table.foreignKeys) {
            return [];
        }

        return table.foreignKeys.map((fk) => {
            return {
                source: {
                    table: fk.reference.table,
                    column: fk?.reference?.columns?.[0]?.column ?? '',
                },
                target: {
                    table: table.name,
                    column: fk?.columns[0]?.column ?? '',
                },
                constraints: {
                    onDelete: fk?.reference?.on?.[0].action.toUpperCase() ?? '',
                    onUpdate: fk?.reference?.on?.[1].action.toUpperCase() ?? '',
                },
            };
        });
    })
        .filter((edges) => edges.length > 0)
        .flat();
    return {
        nodes: Nodes,
        edges: Edges,
    };
};
