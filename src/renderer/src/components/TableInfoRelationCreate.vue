<script setup lang="ts">
import TableInfoRelationAutoComplete from '@components/TableInfoRelationAutoComplete.vue';
import { useTableStore } from '@stores/TableStore';
import { computed, reactive } from 'vue';

const tableStore = useTableStore();
const states = reactive({
    attribute: '',
    attributeSearchTerm: '',
    referencedTable: '',
    referencedTableSearchTerm: '',
    referencedColumn: '',
    referencedColumnSearchTerm: '',
});
const getAttributes = computed(() =>
    tableStore.getAttributesOfCurrentActiveNode.filter((attr) =>
        attr.toLowerCase().includes(states.attributeSearchTerm.toLowerCase()),
    ),
);
const tableColumns = computed(() => {
    const CurrentActiveNode = tableStore.currentActiveNode;
    const CurrentColumnName = CurrentActiveNode.data.table.name;
    const ColumnNames = tableStore.getAllColumnNames.map((column) => column.name);
    return ColumnNames.filter((column) => column !== CurrentColumnName);
});
const referencedColumns = computed(() => {
    const Element = tableStore.elements.filter(
        (element) => element.data.table.name === states.referencedTable,
    );
    if (Element.length === 0) return [];
    const Columns = Element[0].data.table.columns;
    return Columns.map((column) => column.name);
});
</script>

<template>
    <div>
        <TableInfoRelationAutoComplete
            class="mb-4"
            id="tableInfo"
            placeholder="Place table's attribute here"
            v-model="states.attribute"
            v-model:search-term="states.attributeSearchTerm"
            :items="getAttributes"
        >
            <template #label> Attribute: </template>
        </TableInfoRelationAutoComplete>
        <TableInfoRelationAutoComplete
            class="mb-4"
            id="referencedTable"
            placeholder="Place reference table here"
            v-model="states.referencedTable"
            v-model:search-term="states.referencedTableSearchTerm"
            :items="tableColumns"
        >
            <template #label> Referenced Table: </template>
        </TableInfoRelationAutoComplete>
        <TableInfoRelationAutoComplete
            v-if="states.referencedTable !== ''"
            id="referencedColumn"
            placeholder="Place reference column here"
            v-model="states.referencedColumn"
            v-model:search-term="states.referencedColumnSearchTerm"
            :items="referencedColumns"
        >
            <template #label> Referenced Column: </template>
        </TableInfoRelationAutoComplete>
    </div>
</template>
