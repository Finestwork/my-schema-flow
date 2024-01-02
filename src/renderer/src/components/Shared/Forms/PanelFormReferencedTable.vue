<script setup lang="ts">
import VPanelAutoComplete from '@components/Base/Forms/VPanelAutoComplete.vue';
import { useCanvasStore } from '@stores/Canvas';
import { vueFlowKey } from '@symbols/VueFlow';
import { computed, inject, watch } from 'vue';

const { modelValue } = defineModels<{
    modelValue: string;
}>();
const canvasStore = useCanvasStore();
const VueFlow = inject(vueFlowKey);
const getTables = computed(() => {
    if (!VueFlow) return [];
    if (canvasStore.hasActiveEdge) {
        const ReferencedTable =
            canvasStore.currentActiveEdge.targetNode.data.table.name;
        return VueFlow.getNodes.value
            .map((node) => node.data.table.name)
            .filter((name) => name !== ReferencedTable);
    }

    const CurrentTable = canvasStore.currentActiveNode.data.table.name;
    return VueFlow.getNodes.value
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
        id="addRelationReferencedTable"
        v-model="modelValue"
        placeholder="Place referenced table here"
        :dropdown-items="getTables"
    >
        <template #label>Referenced Table:</template>
        <template #helper
            >Table whose primary key column is being referenced by the foreign
            key column in another table.</template
        >
    </VPanelAutoComplete>
</template>
