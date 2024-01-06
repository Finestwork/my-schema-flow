import type { TEdge, TTableColumn } from '@stores/Canvas';
import { klona } from 'klona';

export type TSQLResultObj = {
    name: string;
    script: string;
    foreignKeys: Array<string>;
};

export const createColumnScript = (column: TTableColumn) => {
    const KeyConstraint = column.keyConstraint === 'PK' ? 'PRIMARY KEY' : '';

    if (column.keyConstraint === 'PK') {
        return `${column.name} ${column.type} ${KeyConstraint}`;
    }

    const IsNull = column.isNull ? 'NULL' : 'NOT NULL';
    return `${column.name} ${column.type} ${KeyConstraint} ${IsNull}`;
};

export const createTableRelationScript = (
    nodeId: string,
    edges: Array<TEdge>,
) => {
    const Edges = edges.filter((edge) => edge.target === nodeId);

    if (Edges.length === 0) return [];

    return Edges.map((edge) => {
        const ReferencingColumn = edge.data.referencing.column;
        const ReferencedColumn = edge.data.referenced.column;
        const ReferencedTableName = edge.sourceNode.data.table.name;
        return `FOREIGN KEY (${ReferencingColumn}) REFERENCES ${ReferencedTableName}(${ReferencedColumn}) ON DELETE ${
            edge.data.constraint.onDelete
                ? edge.data.constraint.onDelete
                : 'NO ACTION'
        } ON UPDATE ${
            edge.data.constraint.onUpdate
                ? edge.data.constraint.onUpdate
                : 'NO ACTION'
        }`;
    });
};

export const sortSQLResultObject = (arr: Array<TSQLResultObj>) => {
    const SortedArray = klona(arr);

    // Iterate over the array
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
