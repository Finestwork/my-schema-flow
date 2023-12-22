<script setup lang="ts">
import VPanelAutoComplete from '@components/Base/Forms/VPanelAutoComplete.vue';
import { useCanvasStore } from '@stores/Canvas';
import { computed, watch } from 'vue';

const { modelValue } = defineModels<{
    modelValue: string;
}>();
const canvasStore = useCanvasStore();
const getColumns = computed(() => {
    if (canvasStore.hasActiveEdge) {
        return canvasStore.currentActiveEdge.targetNode.data.table.columns.map(
            (column) => column.name,
        );
    }
    return canvasStore.currentActiveNode.data.table.columns.map(
        (column) => column.name,
    );
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
    </VPanelAutoComplete>
</template>
