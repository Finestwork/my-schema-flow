<script setup lang="ts">
import VPanelAutoComplete from '@components/Base/Forms/VPanelAutoComplete.vue';
import { useCanvasStore } from '@stores/Canvas';
import { computed, watch } from 'vue';

const { modelValue } = defineModels<{
    modelValue: string;
}>();
const canvasStore = useCanvasStore();
const filtered_columns =
    canvasStore.currentActiveNode.data.table.columns.filter(
        (column) =>
            column.keyConstraint !== 'PK' && column.keyConstraint !== '',
    );
const getColumns = computed(() => {
    if (canvasStore.hasActiveEdge) {
        return canvasStore.currentActiveEdge.targetNode.data.table.columns.map(
            (column) => column.name,
        );
    }
    return filtered_columns.map((column) => column.name);
});

// Everytime active node changes, reset model value
watch(
    () => canvasStore.currentActiveNode,
    () => {
        modelValue.value = '';
    },
);
</script>

<template>
    <VPanelAutoComplete
        id="addRelationReferencingColumn"
        v-model="modelValue"
        placeholder="Place referencing column here"
        :dropdown-items="getColumns"
    >
        <template #label>Referencing Column:</template>
        <template #helper
            >The column in another table that holds the foreign key,
            establishing a reference to the primary key in the referenced
            table.</template
        >
    </VPanelAutoComplete>
</template>
