import { mySqlDataTypes } from '@renderer/database/MySqlDataTypes';
import numeral from 'numeral';
import type { TTableColumn } from '@renderer/stores/TableStore';

/**
 * Sorts table column from pk to fk
 */
export const sortConstraintKeys = (arr: TTableColumn[]) => {
    return arr.slice().sort((a, b) => {
        if (a.keyConstraint === b.keyConstraint) {
            return 0;
        }
        if (b.keyConstraint === 'PK') {
            return a.keyConstraint === null ? -1 : 1;
        }
        if (a.keyConstraint === 'FK') {
            return b.keyConstraint === null ? 1 : -1;
        }
        return 1;
    });
};

/**
 * Reformat the column array to make it compatible with the node canvas for display
 */
export const formatColumnForNodeCanvas = (arr: TTableColumn[]) => {
    return arr.map((column) => {
        const Size = numeral(column.length).format('0a');
        const Type = column.type;
        const MySqlDataType = mySqlDataTypes.filter(
            (dataType) => dataType.name === Type,
        )[0];
        let formattedType = '';

        if (MySqlDataType && MySqlDataType.hasSize && Size !== '') {
            formattedType = `${Type}(${Size})`;
        } else {
            formattedType = `${Type}`;
        }

        return {
            name: column.name,
            type: formattedType,
            keyConstraint: column.keyConstraint,
        };
    });
};
