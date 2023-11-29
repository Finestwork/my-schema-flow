import { TTableColumn, useTableStore } from '@stores/TableStore';
import { mySqlDataTypes } from '@renderer/database/MySqlDataTypes';
import { computed, ref } from 'vue';
import { isBoolean, isEmpty, isNumber } from 'lodash';

export function useColumnActions() {
    const tableStore = useTableStore();
    const activeColumnIndex = ref(-1);

    const validateColumns = (columnData: TTableColumn): string[] => {
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

        if (!isEmpty(columnData.length) && !isNumber(parseInt(columnData.length))) {
            Errors.push('Data length must be a number.');
        }

        if (!isBoolean(columnData.isNull)) {
            Errors.push('Null property must be a boolean.');
        }

        // Check if there's an existing primary key
        const CurrentActiveNode = useTableStore().currentActiveNode;
        const Columns = CurrentActiveNode.data.table.columns;
        const Index = Columns.findIndex((column) => column.keyConstraint === 'PK');
        if (Index !== -1 && columnData.keyConstraint === 'PK') {
            Errors.push("There's an existing primary key already.");
        }

        // Make sure that primary is not null
        if (columnData.isNull && Index === -1) {
            Errors.push('Primary key cannot be null.');
        }
        return Errors;
    };
    const addColumn = (columnData: TTableColumn) => {
        const TableStore = useTableStore();
        const Columns = TableStore.currentActiveNode.data.table.columns;
        Columns.push(Object.assign({}, columnData));
    };
    const cloneColumn = (e: MouseEvent) => {
        if (activeColumnIndex.value === -1) return;
        const Columns = tableStore.currentActiveNode.data.table.columns;
        const CurrentColumn = Columns[activeColumnIndex.value];

        // Column with PK cannot be cloned
        if (CurrentColumn.keyConstraint === 'PK') return;

        Columns.push(Object.assign({}, CurrentColumn));
        const Target = <HTMLButtonElement>e.currentTarget;
        activeColumnIndex.value = -1;
        Target.blur();
    };
    const deleteColumn = () => {
        const TableStore = useTableStore();
        const Columns = TableStore.currentActiveNode.data.table.columns;
        console.log(Columns, activeColumnIndex);
        Columns.splice(activeColumnIndex, 1);
        activeColumnIndex.value = -1;
    };
    const canCloneColumn = computed(() => {
        if (activeColumnIndex.value < 0) return false;
        const Columns = tableStore.currentActiveNode.data.table.columns;
        const CurrentSelectedColumn = Columns[activeColumnIndex.value];
        if (CurrentSelectedColumn.length === 0) return false;
        return CurrentSelectedColumn.keyConstraint !== 'PK';
    });

    return {
        activeColumnIndex,
        validateColumns,
        addColumn,
        cloneColumn,
        deleteColumn,
        canCloneColumn,
    };
}
