<script setup lang="ts">
import VAddIcon from '@components/Shared/Icons/VAddIcon.vue';
import BackButton from '@components/TableInfo/Shared/BackButton.vue';
import BaseButton from '@components/TableInfo/Shared/BaseButton.vue';
import AutoComplete from '@components/TableInfo/RelationSettings/Partials/AutoComplete.vue';
import { useTableRelationDropdown } from '@composables/useTableRelationDropdown';
import { useTableStore } from '@stores/TableStore';
import { reactive } from 'vue';

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
const { getAttributes, tableColumns, referencedColumns, isBtnDisabled } =
    useTableRelationDropdown(states);
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
    <BackButton class="mb-4 mt-2.5" @click="emits('goBack')" />
    <AutoComplete
        id="referencingColumn"
        v-model="states.referencingColumn"
        v-model:search-term="states.referencingColumnSearchTerm"
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

    <BaseButton class="mt-6" :disabled="isBtnDisabled" @click="onClickEstablishRelation">
        <template #icon>
            <VAddIcon />
        </template>
        <template #text>Add Relation</template>
    </BaseButton>
</template>
