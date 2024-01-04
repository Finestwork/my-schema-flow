import { mySqlDataTypes } from '@utilities/DatabaseHelper';
import { isBoolean, isEmpty } from 'lodash';
import type { TNode, TTableColumn, TEdge } from '@stores/Canvas';
import type { TRelationFormData } from '@composables/Table/useTableRelationActions';

/**
 * Parses the table length from a string to an integer.
 */
export const parseTableLength = (length: string) => {
    const Length = length.split(',').join(''); // Since length can be a string like '10,230'
    return parseInt(Length);
};

export const validateColumns = (
    data: Omit<TTableColumn, 'id' | 'shouldHighlight'>,
    currentNode: TNode | Record<string, never>,
): Array<string> => {
    const Errors: Array<string> = [];

    if (isEmpty(data.name)) {
        Errors.push('Column name cannot be empty.');
    } else {
        // If user is currently editing the column, do not run the uniqueness check
        if (!('originalColumnName' in data)) {
            const Columns = currentNode.data.table.columns;
            const Index = Columns.findIndex(
                (column: TTableColumn) => column.name === data.name,
            );
            if (Index !== -1) {
                Errors.push('Column already exists.');
            }
        }
    }

    if (isEmpty(data.type)) {
        Errors.push('Column type cannot be empty.');
    } else {
        // Check if a data type is valid in mysql
        const Index = mySqlDataTypes.findIndex(
            (dataType) =>
                dataType.name.toLowerCase() === data.type.toLowerCase(),
        );

        if (Index === -1) {
            Errors.push('Data type is invalid.');
        }
    }

    if (!isBoolean(data.isNull)) {
        Errors.push('Null property must be a boolean.');
    }

    // Check if there's an existing primary key
    const Columns = currentNode.data.table.columns;
    const PKIndex = Columns.findIndex(
        (column: TTableColumn) => column.keyConstraint === 'PK',
    );

    // originalColumnName is only set when editing a column
    if ('originalColumnName' in data) {
        const CheckUniqueness =
            PKIndex !== -1 &&
            data.keyConstraint === 'PK' &&
            data.originalColumnName !== Columns[PKIndex].name;

        if (CheckUniqueness) {
            Errors.push('There should be only one primary key.');
        } else {
            // If there's no primary key, then check if null property is enabled
            if (data.isNull && !isEmpty(data.keyConstraint)) {
                Errors.push(
                    'Null property must not be enabled because column is a primary key.',
                );
            }
        }
    } else {
        if (PKIndex !== -1 && data.keyConstraint === 'PK') {
            Errors.push('There should be only one primary key.');
        } else {
            // If there's no primary key, then check if null property is enabled
            if (data.isNull && !isEmpty(data.keyConstraint)) {
                Errors.push(
                    'Null property must not be enabled because column is a primary key.',
                );
            }
        }
    }

    return Errors.map((error) => `• ${error}`);
};

export const validateTableRelations = (
    data: TRelationFormData,
    currentActiveNode: TNode | Record<string, never>,
    nodes: Array<TNode>,
    edges: Array<TEdge>,
    action: string,
): Array<string> => {
    let Errors: Array<string> = [];
    let referencedNode: TNode | undefined = undefined;
    let source: TTableColumn | undefined = undefined;
    let target: TTableColumn | undefined = undefined;

    if (isEmpty(data.referencingColumn)) {
        Errors.push('Referencing column should not be empty.');
    } else {
        const TableName = currentActiveNode.data.table.name;
        const Columns = currentActiveNode.data.table.columns;
        source = Columns.find(
            (column: TTableColumn) => column.name === data.referencingColumn,
        );
        if (!source) {
            Errors.push(
                `Referencing column not found in '${TableName}' table.`,
            );
        }
    }

    if (isEmpty(data.referencedTable)) {
        Errors.push('Referenced table should not be empty.');
    } else {
        referencedNode = nodes.find(
            (node) => node.data.table.name === data.referencedTable,
        );
        if (!referencedNode) {
            Errors.push(`Referenced table not found.`);
        }
    }

    if (isEmpty(data.referencedColumn)) {
        Errors.push('Referenced column should not be empty.');
    }

    if (referencedNode && !isEmpty(data.referencedColumn)) {
        const Columns = referencedNode.data.table.columns;
        target = Columns.find(
            (column: TTableColumn) => column.name === data.referencedColumn,
        );

        if (!target) {
            Errors.push(
                `Referenced column not found in '${data.referencedTable}' table.`,
            );
        }

        if (action === 'add') {
            const ExistingEdge = edges.find(
                (edge) =>
                    edge.target === currentActiveNode.id &&
                    edge.data.referencing.column === data.referencingColumn,
            );
            if (ExistingEdge) {
                Errors.push(
                    `It's possible that '${data.referencingColumn}' has been utilized to form a relationship.`,
                );
            }
        }

        if (target?.type !== source?.type) {
            Errors.push(
                `Referencing column '${data.referencingColumn}' is not the same data type as referenced column '${data.referencedColumn}'.`,
            );
        }

        // Call the ValidateConstraint and pass the errors array

        Errors = ValidateConstraint(
            data.constraint,
            Errors,
            source,
            data.referencingColumn,
        );
    }

    return Errors.map((error) => `• ${error}`);
};

const ValidateConstraint = (
    constraint: TRelationFormData['constraint'],
    Errors: Array<string>,
    source?: TTableColumn,
    referencingColumn?: string,
) => {
    const validForeignKeyActions = [
        'NO ACTION',
        'CASCADE',
        'SET NULL',
        'SET DEFAULT',
        'RESTRICT',
    ];

    // If the user ommits the constraint, default to NO ACTION
    constraint.onDelete = isEmpty(constraint.onDelete)
        ? 'NO ACTION'
        : constraint.onDelete;
    constraint.onUpdate = isEmpty(constraint.onUpdate)
        ? 'NO ACTION'
        : constraint.onUpdate;
    // Check if the referenced column is the same data type as the referencing column
    if (!validForeignKeyActions.includes(constraint.onDelete)) {
        Errors.push(`On delete action '${constraint.onDelete}' is invalid.`);
    }

    if (!validForeignKeyActions.includes(constraint.onUpdate)) {
        Errors.push(`On update action '${constraint.onUpdate}' is invalid.`);
    }
    // Default to NO ACTION if the user did not select any action

    if (constraint.onDelete === 'SET DEFAULT' && source?.isNull) {
        Errors.push(
            `Referencing column '${referencingColumn}' should not be nullable because 'SET DEFAULT' is selected.`,
        );
    }

    if (constraint.onDelete === 'SET NULL' && !source?.isNull) {
        Errors.push(
            `Referencing column '${referencingColumn}' should be nullable because 'SET NULL' is selected.`,
        );
    }

    return Errors;
};
