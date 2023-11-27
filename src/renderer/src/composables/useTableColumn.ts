import { useTableStore } from '@stores/TableStore';
import { mySqlDataTypes } from '@renderer/database/MySqlDataTypes';
import { isEmpty, isBoolean, isNumber } from 'lodash';
import type { TTableColumn } from '@stores/TableStore';

export const validateColumn = (columnData: TTableColumn): string[] => {
    const Errors = [] as string[];

    if (isEmpty(columnData.name)) {
        Errors.push('Column name is empty.');
    }

    if (isEmpty(columnData.type)) {
        Errors.push('Data type is empty.');
    } else {
        // Check if data type is valid in mysql
        const Index = mySqlDataTypes.findIndex(
            (dataType) => dataType.name.toLowerCase() === columnData.type.toLowerCase(),
        );

        if (Index === -1) {
            Errors.push('Data type is invalid.');
        }
    }

    if (isEmpty(columnData.length)) {
        Errors.push('Data length is empty.');
    } else {
        if (!isNumber(parseInt(columnData.length))) {
            Errors.push('Data length must be a number.');
        }
    }

    if (!isBoolean(columnData.isNull)) {
        Errors.push('Null property must be a boolean.');
    }

    return Errors;
};

export const addColumn = (columnData: TTableColumn) => {
    const Errors = validateColumn(columnData);

    if (Errors.length !== 0) return;

    const TableStore = useTableStore();
    const Columns = TableStore.currentActiveNode.data.table.columns;
    Columns.push(columnData);
};
