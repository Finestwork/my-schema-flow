import { useTableStore } from '@renderer/stores/TableStore';
import { computed } from 'vue';

export type TDropdownStates = {
    referencedColumn: string;
    referencedTable: string;
    referencingColumn: string;
    referencingColumnSearchTerm: string;
    referencedColumnSearchTerm: string;
    referencedTableSearchTerm: string;
};

export function useTableRelationDropdown(states: TDropdownStates) {
    const TableStore = useTableStore();

    /**
     * Get all columns of a referencing table
     */
    const getAttributes = computed(() =>
        TableStore.getAttributesOfCurrentActiveNode.filter((attr) =>
            attr.toLowerCase().includes(states.referencingColumnSearchTerm.toLowerCase()),
        ),
    );

    /**
     * Get all columns of a referenced table
     */
    const referencedColumns = computed(() => {
        const Element = TableStore.elements.filter(
            (element) => element.data.table.name === states.referencedTable,
        );
        if (Element.length === 0) return [];
        const Columns = Element[0].data.table.columns;
        return Columns.map((column) => column.name).filter((column) =>
            column.toLowerCase().includes(states.referencedColumnSearchTerm),
        );
    });

    /**
     * Get all columns
     */
    const tableColumns = computed(() => {
        const CurrentActiveNode = TableStore.currentActiveNode;
        const CurrentColumnName = CurrentActiveNode.data.table.name;
        const ColumnNames = TableStore.getAllColumnNames.map((column) => column.name);
        return ColumnNames.filter((column) => column !== CurrentColumnName).filter((attr) =>
            attr.toLowerCase().includes(states.referencedTableSearchTerm.toLowerCase()),
        );
    });
    const isBtnDisabled = computed(() => {
        return (
            states.referencingColumn.trim() === '' ||
            states.referencedTable.trim() === '' ||
            states.referencedColumn.trim() === ''
        );
    });
    return {
        getAttributes,
        tableColumns,
        referencedColumns,
        isBtnDisabled,
    };
}
