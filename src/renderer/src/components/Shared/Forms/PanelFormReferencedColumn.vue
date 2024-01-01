<script setup lang="ts">
import VPanelAutoComplete from '@components/Base/Forms/VPanelAutoComplete.vue';
import { useCanvasStore } from '@stores/Canvas';
import { findNodeByTableName } from '@utilities/CanvasHelper';
import { vueFlowKey } from '@symbols/VueFlow';
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
const VueFlow = inject(vueFlowKey);
const getColumns = computed(() => {
    if (props.referencedTable.trim() === '' || !VueFlow) return [];
    const Node = findNodeByTableName(
        props.referencedTable,
        VueFlow.getNodes.value,
    );
    if (!Node) return [];
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
        <template #helper
            >The primary key column in the referenced (referred to)
            table</template
        >
    </VPanelAutoComplete>
</template>
