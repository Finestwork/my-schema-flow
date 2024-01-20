import type { TEdge, TNode, TTableColumn } from '@stores/Canvas';
import { klona } from 'klona';

export type TSQLResultObj = {
    name: string;
    script: string;
    foreignKeys: Array<string>;
};

export const createInsertTableScript = (column: TTableColumn) => {
    const KeyConstraint = column.keyConstraint === 'PK' ? 'PRIMARY KEY' : '';

    if (column.keyConstraint === 'PK') {
        return `\t${column.name.trim()} ${column.type.trim()} ${KeyConstraint}`;
    }
    const IsNull = column.isNull ? 'NULL' : 'NOT NULL';

    // This will remove empty space between a column type and null constraint, which will surely cause an error
    if (KeyConstraint === '') {
        return `\t${column.name.trim()} ${column.type.trim()} ${IsNull}`;
    }

    return `\t${column.name.trim()} ${column.type.trim()} ${KeyConstraint} ${IsNull}`;
};

export const createTableRelationScript = (
    nodeId: string,
    edges: Array<TEdge>,
) => {
    const Edges = edges.filter((edge) => edge.target === nodeId);

    if (Edges.length === 0) return [];

    return Edges.map((edge) => {
        const ReferencingTableName = edge.targetNode.data.table.name;
        const ReferencingColumn = edge.data.referencing.column;
        const ReferencedColumn = edge.data.referenced.column;
        const ReferencedTableName = edge.sourceNode.data.table.name;
        const OnDeleteReferentialIntegrityConstraint = edge.data.constraint
            .onDelete
            ? edge.data.constraint.onDelete
            : 'NO ACTION';
        const OnUpdateReferentialIntegrityConstraint = edge.data.constraint
            .onUpdate
            ? edge.data.constraint.onUpdate
            : 'NO ACTION';

        return `ALTER TABLE ${ReferencingTableName} ADD FOREIGN KEY (${ReferencingColumn}) REFERENCES ${ReferencedTableName}(${ReferencedColumn}) ON DELETE ${OnDeleteReferentialIntegrityConstraint} ON UPDATE ${OnUpdateReferentialIntegrityConstraint}`;
    });
};

export const sortSQLResultObject = (arr: Array<TSQLResultObj>) => {
    const SortedArray = klona(arr);

    for (let i = 0; i < SortedArray.length; i++) {
        const Current = SortedArray[i];

        // Check if the current item has any relationships
        if (Current.foreignKeys.length > 0) {
            Current.foreignKeys.forEach((relation) => {
                // Find the index of the related item
                const RelatedIndex = SortedArray.findIndex(
                    (item) => item.name === relation,
                );

                // Check if the related item is in a position prior to the current one
                if (RelatedIndex > i) {
                    // Remove the related item and store it in a variable
                    const RelatedItem = SortedArray.splice(RelatedIndex, 1)[0];

                    // Insert the related item right before the current one
                    SortedArray.splice(i, 0, RelatedItem);
                }
            });
        }
    }

    return SortedArray;
};

export const createUniqueScript = (arr: Array<TNode>) => {
    return arr
        .filter((node) => {
            const Columns = node.data.table.columns;
            const UniqueColumn = Columns.find((column) => column.isUnique);
            return !!UniqueColumn;
        })
        .map((node) => {
            const Columns = node.data.table.columns;
            const UniqueColumns = Columns.filter(
                (column) => column.isUnique,
            ).map((columns) => columns.name);

            return UniqueColumns.map((col) => {
                return `ALTER TABLE ${node.data.table.name} ADD CONSTRAINT uniq_${col} UNIQUE(${col});`;
            });
        });
};

export const createIndexScript = (arr: Array<TNode>) => {
    return arr
        .filter((node) => node.data.table.indexes.length !== 0)
        .map((node) => {
            const Table = node.data.table.name;
            return node.data.table.indexes.map((attr) => {
                const Constraint =
                    attr.type === 'non-unique'
                        ? 'INDEX'
                        : attr.type === 'unique'
                          ? 'UNIQUE INDEX'
                          : attr.type === 'spatial'
                            ? 'SPATIAL INDEX'
                            : 'FULLTEXT INDEX';

                return `ALTER TABLE ${Table} ADD ${Constraint} (${attr.column});`;
            });
        })
        .flat();
};
