import { useTableStore } from '@stores/TableStore';
import { isEmpty, isBoolean, isNumber } from 'lodash';

export type TData = {
    name: string;
    dataType: string;
    length: string;
    isNull: boolean;
};

export const validateColumn = (columnData: TData): string[] => {
    const Errors = [] as string[];

    if (isEmpty(columnData.name)) {
        Errors.push('Column name is empty.');
    }

    if (isEmpty(columnData.dataType)) {
        Errors.push('Data type is empty.');
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

export const addColumn = (columnData: TData) => {
    const Errors = validateColumn(columnData);

    if (Errors.length !== 0) return;

    const TableStore = useTableStore();
    const Columns = TableStore.currentActiveNode.data.table.columns;
    Columns.push(columnData);
};
