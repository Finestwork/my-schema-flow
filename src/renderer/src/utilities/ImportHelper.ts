import * as initSqlJs from 'sql.js/dist/sql-asm.js';
import { v4 as uuidv4 } from 'uuid';
import { Parser } from 'sql-ddl-to-json-schema';
import { klona } from 'klona/full';
import type { TTableColumn } from '@stores/Canvas';

export type TGeneratedNodeData = {
    id: string;
    name: string;
    columns: Array<Omit<TTableColumn, 'id'>>;
};

export type TGeneratedEdgeData = {
    id: string;
    referencingTable: string;
    referencedTable: string;
    data: {
        referenced: {
            isHandleActive: boolean;
            column: string;
        };
        referencing: {
            isHandleActive: boolean;
            column: string;
        };
        constraint: {
            onDelete: string;
            onUpdate: string;
        };
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
    const TableNames = DatabaseTableNames[0].values.map((value) => value[0]);
    const Nodes: Array<TGeneratedNodeData> = TableNames.map((tableName) => {
        type TRow = [number, string, string, number, null, number];
        const ColumnValues: Array<TRow> = SQLDatabaseInstance.exec(
            `PRAGMA table_info(${tableName})`,
        )[0].values;

        const MapColumnValues = (row: TRow) => {
            const ColumnDataType = row[2];
            const ColumnKeyConstraint = row[5] === 1 ? 'PK' : '';

            return {
                name: row[1],
                type: ColumnDataType,
                isNull: row[3] === null,
                isUnique: false,
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
        const PrimaryKey =
            table?.primaryKey?.columns?.map((key) => key.column) ?? [];
        const ForeignKeys =
            table?.foreignKeys?.map((key) => key.columns)?.flat() ?? [];
        const TableColumns = klona(table?.columns) ?? [];
        const Columns = TableColumns.map((row): Omit<TTableColumn, 'id'> => {
            const PKExistence = PrimaryKey.findIndex(
                (column) => column === row.name,
            );
            const FKExistence = ForeignKeys.findIndex(
                (key) => key.column === row.name,
            );
            const KeyConstraint =
                FKExistence > -1 ? 'FK' : PKExistence > -1 ? 'PK' : '';
            const UniqueKeys =
                table?.uniqueKeys
                    ?.map((key) => {
                        return key.columns.map((column) => column.column);
                    })
                    .flat() ?? [];

            return {
                name: row.name,
                type: row.type.datatype.toUpperCase(),
                isNull: row?.options?.nullable ?? true,
                isUnique: UniqueKeys.includes(row.name),
                keyConstraint: KeyConstraint,
                shouldHighlight: false,
            };
        });

        return {
            id: uuidv4(),
            name: table.name,
            columns: Columns,
        };
    });
    const Edges = JSONSchema.map((table) => {
        const TableName = table.name;
        const ForeignKeys = table?.foreignKeys ?? [];

        if (ForeignKeys.length) {
            return ForeignKeys.map((column) => {
                const ReferencingColumn = column?.columns?.[0]?.column ?? '';
                const ReferencedTable = column.reference.table;
                const ReferencedColumn =
                    column.reference?.columns?.[0]?.column ?? '';
                const OnActions = column.reference?.on?.map((actions) => {
                    if (actions.trigger === 'delete') {
                        return {
                            onDelete: actions.action,
                        };
                    }
                    return {
                        onUpdate: actions.action,
                    };
                });

                return {
                    id: uuidv4(),
                    referencingTable: TableName,
                    referencedTable: ReferencedTable,
                    data: {
                        referenced: {
                            isHandleActive: false,
                            column: ReferencedColumn,
                        },
                        referencing: {
                            isHandleActive: false,
                            column: ReferencingColumn,
                        },
                        constraint: {
                            onDelete: OnActions?.[0]?.onDelete ?? 'NO ACTION',
                            onUpdate: OnActions?.[1]?.onDelete ?? 'NO ACTION',
                        },
                    },
                };
            });
        }

        return null;
    })
        .filter((edge) => edge !== null)
        .flat() as Array<TGeneratedEdgeData>;

    return {
        nodes: Nodes,
        edges: Edges,
    };
};
