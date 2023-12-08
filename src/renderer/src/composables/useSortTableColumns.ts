import { sortConstraintKeys } from '@renderer/utilities/TableColumnHelper';
import type { TTableColumn } from '@renderer/stores/TableStore';
import { useTableStore } from '@renderer/stores/TableStore';
import { computed } from 'vue';

/**
 * Sorts table column from PK to FK to ordinary ones.
 */
export function useSortTableColumns() {
    const tableStore = useTableStore();

    /**
     * Sorts the column of active node from PK to FK
     */
    const sortActiveTableColumns = computed((): null | TTableColumn[] => {
        const Columns = tableStore?.currentActiveNode?.data?.table?.columns ?? [];
        return sortConstraintKeys(Columns);
    });

    /**
     * Sorts all table nodes from PK to FK
     */
    const sortAllColumnsInTables = () => {
        tableStore.elements = tableStore.elements.map((element) => {
            const Columns = element.data.table.columns;
            element.data.table.columns = sortConstraintKeys(Columns);
            return element;
        });
    };

    return { sortActiveTableColumns, sortAllColumnsInTables };
}
