import { mySqlDataTypes } from '@utilities/DatabaseHelper';
import { isBoolean, isEmpty } from 'lodash';
import type { TNode } from '@stores/CanvasStore';
import type { TTableColumn } from '@stores/CanvasStore';

/**
 * Parses the table length from a string to an integer.
 */
export const parseTableLength = (length: string) => {
    const Length = length.split(',').join(''); // Since length can be a string like '10,230'
    return parseInt(Length);
};

export const validateColumns = (
    data: Omit<TTableColumn, 'id'>,
    currentNode: TNode,
): Array<string> => {
    const Errors = [];

    if (isEmpty(data.name)) {
        Errors.push('Column name cannot be empty.');
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
        (column) => column.keyConstraint === 'PK',
    );
    if (PKIndex !== -1 && data.keyConstraint === 'PK') {
        Errors.push('There should be only one primary key.');
    } else {
        // If there's no primary key, then check if null property is enabled
        if (data.isNull) {
            Errors.push(
                'Null property must not be enabled because column is a primary key.',
            );
        }
    }

    return Errors.map((error) => `• ${error}`);
};
