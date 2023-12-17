<script setup lang="ts">
import VPanelAutoComplete from '@components/Base/Forms/VPanelAutoComplete.vue';
import { useCanvasStore } from '@stores/CanvasStore';
import { findNodeByTableName } from '@utilities/CanvasHelper';
import { getNodesKey } from '@symbols/Canvas';
import { computed, inject, watch } from 'vue';

export type TProps = {
    referencedTable: string;
    disabled?: boolean;
};
const props = withDefaults(defineProps<TProps>(), {
    disabled: false,
});
const { modelValue } = defineModels<{
    modelValue: string;
}>();
const canvasStore = useCanvasStore();
const getNodes = inject(getNodesKey);
const getColumns = computed(() => {
    if (props.referencedTable.trim() === '') return [];
    const Node = findNodeByTableName(props.referencedTable, getNodes.value);
    const Columns = Node.data.table.columns;
    return Columns.map((column) => column.name);
});

// Everytime active node changes, reset model value
watch(
    () => [canvasStore.currentActiveNode, props.referencedTable],
    () => {
        modelValue.value = '';
    },
);
</script>

<template>
    <VPanelAutoComplete
        id="addRelationFormReferencedColumn"
        v-model="modelValue"
        placeholder="Place referenced column here"
        :dropdown-items="getColumns"
        :disabled="props.disabled"
    >
        <template #label>Referenced Column:</template>
    </VPanelAutoComplete>
</template>
