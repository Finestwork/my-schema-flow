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
            id="tableInfo"
            placeholder="Place table's attribute here"
            v-model="states.referencedTable"
            v-model:search-term="states.referencedTableSearchTerm"
            :items="tableColumns"
        >
            <template #label> Referenced Table: </template>
        </TableInfoRelationAutoComplete>
    </div>
</template>
