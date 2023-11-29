import { computed } from 'vue';
import { useTableStore } from '@stores/TableStore';
import type { TTableColumn } from '@stores/TableStore';

/**
 * Sorts table column from PK to FK to ordinary ones.
 */
export function useSortTableColumns() {
    const tableStore = useTableStore();
    const sortedActiveNodeColumns = computed((): null | TTableColumn[] => {
        const Columns = tableStore?.currentActiveNode?.data?.table?.columns ?? [];
        return Columns.sort((a, b) => {
            if (a.keyConstraint === b.keyConstraint) {
                return 0;
            }
            if (a.keyConstraint === 'PK') {
                return -1;
            }
            if (a.keyConstraint === 'FK') {
                return b.keyConstraint === null ? -1 : 1;
            }
            return 1;
        });
    });

    return { sortedActiveNodeColumns };
}
