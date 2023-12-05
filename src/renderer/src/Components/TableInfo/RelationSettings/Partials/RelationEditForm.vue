<script setup lang="ts">
import VEditIcon from '@components/Shared/Icons/VEditIcon.vue';
import VTrashIcon from '@components/Shared/Icons/VTrashIcon.vue';
import BackButton from '@components/TableInfo/Shared/BackButton.vue';
import BaseButtonIcon from '@components/TableInfo/Shared/BaseButtonIcon.vue';
import AutoComplete from '@components/TableInfo/RelationSettings/Partials/AutoComplete.vue';
import { useTableRelation } from '@composables/useTableRelation';
import { useTableRelationDropdown } from '@composables/useTableRelationDropdown';
import { nextTick, reactive, watch } from 'vue';

const { tableStore, currentActiveEdge } = useTableRelation();
const states = reactive({
    referencingColumn: currentActiveEdge.value.data.referencing.column,
    referencingColumnSearchTerm: '',
    referencedTable: currentActiveEdge.value.data.referenced.table,
    referencedTableSearchTerm: '',
    referencedColumn: currentActiveEdge.value.data.referenced.column,
    referencedColumnSearchTerm: '',
});
const emits = defineEmits<{
    (e: 'error', payload: string[]);
}>();
const { getAttributes, referencedColumns, tableColumns, isBtnDisabled } =
    useTableRelationDropdown(states);
const onClickUpdateRelation = async () => {
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
    tableStore.updateNewEdge(currentActiveEdge.value.id, ReferencedObj, ReferencingObj);
    await nextTick();
    tableStore.currentActiveEdgeIndex = -1;
};
const onClickDeleteRelation = async () => {
    tableStore.deleteEdge(currentActiveEdge.value.id);
    await nextTick();
    tableStore.currentActiveEdgeIndex = -1;
};
watch(
    () => states.referencedTable,
    (newVal, oldVal) => {
        if (newVal === oldVal) return;
        states.referencedColumn = '';
    },
);
</script>

<template>
    <BackButton class="mb-4 mt-2.5" @click="tableStore.currentActiveEdgeIndex = -1" />
    <AutoComplete
        id="referencingColumn"
        v-model:search-term="states.referencingColumnSearchTerm"
        v-model="states.referencingColumn"
        class="mb-4"
        placeholder="Place referencing column here"
        :items="getAttributes"
    >
        <template #label>Referencing Column:</template>
    </AutoComplete>
    <AutoComplete
        id="referencedTable"
        v-model="states.referencedTable"
        v-model:search-term="states.referencedTableSearchTerm"
        class="mb-4"
        placeholder="Place referenced table here"
        :items="tableColumns"
    >
        <template #label> Referenced Table:</template>
    </AutoComplete>
    <AutoComplete
        v-if="states.referencedTable !== ''"
        id="referencedColumn"
        v-model="states.referencedColumn"
        v-model:search-term="states.referencedColumnSearchTerm"
        placeholder="Place referenced column here"
        :items="referencedColumns"
    >
        <template #label> Referenced Column:</template>
    </AutoComplete>

    <div class="mt-6">
        <BaseButtonIcon class="mr-2" :disabled="isBtnDisabled" @click="onClickUpdateRelation">
            <VEditIcon />
            <template #tooltip> Update Relation</template>
        </BaseButtonIcon>
        <BaseButtonIcon color-scheme="danger" @click="onClickDeleteRelation">
            <VTrashIcon />
            <template #tooltip> Delete Relation</template>
        </BaseButtonIcon>
    </div>
</template>
