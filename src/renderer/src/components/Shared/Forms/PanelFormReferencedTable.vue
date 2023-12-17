<script setup lang="ts">
import VPanelAutoComplete from '@components/Base/Forms/VPanelAutoComplete.vue';
import { useCanvasStore } from '@stores/CanvasStore';
import { getNodesKey } from '@symbols/Canvas';
import { computed, inject, watch } from 'vue';

const { modelValue } = defineModels<{
    modelValue: string;
}>();
const canvasStore = useCanvasStore();
const getNodes = inject(getNodesKey);
const getColumns = computed(() => {
    const CurrentTable = canvasStore.currentActiveNode.data.table.name;
    return getNodes.value
        .map((node) => node.data.table.name)
        .filter((name) => name !== CurrentTable);
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
        id="addColumnTypeForm"
        v-model="modelValue"
        placeholder="Place referenced table here"
        :dropdown-items="getColumns"
    >
        <template #label>Referenced Table:</template>
    </VPanelAutoComplete>
</template>
