import { computed } from 'vue';
import { useTableStore } from '@stores/TableStore';
import { sortConstraintKeys } from '@renderer/TableColumnHelper';
import type { TTableColumn } from '@stores/TableStore';

/**
 * Sorts table column from PK to FK to ordinary ones.
 */
export function useSortTableColumns() {
    const tableStore = useTableStore();
    const sortedActiveNodeColumns = computed((): null | TTableColumn[] => {
        const Columns = tableStore?.currentActiveNode?.data?.table?.columns ?? [];
        return sortConstraintKeys(Columns);
    });

    return { sortedActiveNodeColumns };
}
