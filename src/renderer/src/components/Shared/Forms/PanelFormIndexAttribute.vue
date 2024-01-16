<script setup lang="ts">
import VPanelAutoComplete from '@components/Base/Forms/VPanelAutoComplete.vue';
import { useCanvasStore } from '@stores/Canvas';
import { computed } from 'vue';

const { modelValue } = defineModels<{
    modelValue: string;
}>();

const canvasStore = useCanvasStore();
const tableColumns = computed(() => {
    if (!canvasStore.hasActiveNode) return [];
    return canvasStore.currentActiveNode.data.table.columns
        .map((column) => column.name)
        .filter((column) => {
            const Indexes = canvasStore.currentActiveNode.data.table.indexes;
            const IndexObject = Indexes.find(
                (index) => index.column === column,
            );
            return !IndexObject;
        });
});
</script>
<template>
    <VPanelAutoComplete
        id="indexAttributeForm"
        v-model="modelValue"
        placeholder="Place attribute here"
        :dropdown-items="tableColumns"
    >
        <template #label>Attributes:</template>
    </VPanelAutoComplete>
</template>
