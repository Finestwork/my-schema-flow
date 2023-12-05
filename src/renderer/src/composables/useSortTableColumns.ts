import { sortConstraintKeys } from '@renderer/utils/TableColumnHelper';
import type { TTableColumn } from '@stores/TableStore';
import { useTableStore } from '@stores/TableStore';
import { computed } from 'vue';

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
