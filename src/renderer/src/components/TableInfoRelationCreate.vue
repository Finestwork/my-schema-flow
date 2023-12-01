<script setup lang="ts">
import IconAdd from '@components/IconAdd.vue';
import TableInfoBaseButton from '@components/TableInfoBaseButton.vue';
import TableInfoBackButton from '@components/TableInfoBackButton.vue';
import TableInfoRelationAutoComplete from '@components/TableInfoRelationAutoComplete.vue';
import { useTableStore } from '@stores/TableStore';
import { computed, reactive } from 'vue';

const tableStore = useTableStore();
const states = reactive({
    referencingColumn: '',
    referencingColumnSearchTerm: '',
    referencedTable: '',
    referencedTableSearchTerm: '',
    referencedColumn: '',
    referencedColumnSearchTerm: '',
});
const emits = defineEmits<{
    (e: 'relationshipEstablished');
    (e: 'goBack');
    (e: 'error', payload: string[]);
}>();
const getAttributes = computed(() =>
    tableStore.getAttributesOfCurrentActiveNode.filter((attr) =>
        attr.toLowerCase().includes(states.referencingColumnSearchTerm.toLowerCase()),
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
const isBtnDisabled = computed(() => {
    return (
        states.referencingColumn.trim() === '' ||
        states.referencedTable.trim() === '' ||
        states.referencedColumn.trim() === ''
    );
});
const onClickEstablishRelation = () => {
    const Element = tableStore.elements.filter(
        (element) => element.data.table.name === states.referencedTable,
    )[0];

    // Validate if source column is already existing
    const Edge = tableStore.edges.filter(
        (edge) =>
            edge.data.referencedColumn === states.referencedColumn &&
            edge.data.referencingColumn === states.referencingColumn,
    )[0];

    if (Edge) {
        emits('error', ['Relationship has already been established.']);
        return;
    }

    const ReferencedObj = {
        id: Element.id,
        column: states.referencedColumn,
        table: states.referencedTable,
    };
    const ReferencingObj = {
        id: tableStore.currentActiveNode.id,
        column: states.referencingColumn,
        table: tableStore.currentActiveNode.data.table.name,
    };
    tableStore.addNewEdge(ReferencedObj, ReferencingObj);
    emits('relationshipEstablished');
};
</script>

<template>
    <TableInfoBackButton class="mb-4 mt-2.5" @click="emits('goBack')" />
    <TableInfoRelationAutoComplete
        class="mb-4"
        id="referencingColumn"
        placeholder="Place referencing column here"
        v-model="states.referencingColumn"
        v-model:search-term="states.referencingColumnSearchTerm"
        :items="getAttributes"
    >
        <template #label>Referencing Column:</template>
    </TableInfoRelationAutoComplete>
    <TableInfoRelationAutoComplete
        class="mb-4"
        id="referencedTable"
        placeholder="Place referenced table here"
        v-model="states.referencedTable"
        v-model:search-term="states.referencedTableSearchTerm"
        :items="tableColumns"
    >
        <template #label> Referenced Table:</template>
    </TableInfoRelationAutoComplete>
    <TableInfoRelationAutoComplete
        v-if="states.referencedTable !== ''"
        id="referencedColumn"
        placeholder="Place referenced column here"
        v-model="states.referencedColumn"
        v-model:search-term="states.referencedColumnSearchTerm"
        :items="referencedColumns"
    >
        <template #label> Referenced Column:</template>
    </TableInfoRelationAutoComplete>

    <TableInfoBaseButton class="mt-6" :disabled="isBtnDisabled" @click="onClickEstablishRelation">
        <template #icon>
            <IconAdd />
        </template>
        <template #text>Add Relation</template>
    </TableInfoBaseButton>
</template>
