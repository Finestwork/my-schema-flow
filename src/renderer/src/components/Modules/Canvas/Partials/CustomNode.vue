<script setup lang="ts">
import VPrimaryTableNode from '@components/Base/CustomTableNodes/VPrimaryTableNode.vue';
import VTableNodeButton from '@components/Base/Buttons/VTableNodeButton.vue';
import VCircleHandle from '@components/Base/CustomNodeHandles/VCircleHandle.vue';
import CustomNodeToolbar from '@components/Modules/Canvas/Partials/CustomNodeToolbar.vue';
import { useCanvasStore } from '@stores/Canvas';
import { formatColumnForNodeCanvas } from '@utilities/TableHelper';
import { jellyAnimation } from '@utilities/AnimateHelper';
import { isCreatingTableKey } from '@symbols/Canvas';
import { computed, ref, onMounted, inject, watch } from 'vue';
import { useVueFlow } from '@vue-flow/core';
import type { TNodeData } from '@stores/Canvas';

export type TProps = {
    id: string;
    data: TNodeData;
};
const props = defineProps<TProps>();
const canvasStore = useCanvasStore();
const isCreatingTable = inject(isCreatingTableKey);
const root = ref();
const isTableSelected = ref(false);
const isFaded = computed(
    () => !props.data.states.isActive && props.data.states.isFaded,
);
const isActive = computed(
    () => props.data.states.isActive && !props.data.states.isFaded,
);
const isDefault = computed(
    () => !props.data.states.isActive && !props.data.states.isFaded,
);
const getColumns = computed(() => {
    const Columns = formatColumnForNodeCanvas(props.data.table.columns);

    return Columns.map((column, ind) => {
        const CanDisplayDefaultClasses =
            (isActive.value || isDefault.value) &&
            !isFaded.value &&
            !column.shouldHighlight;
        const CanDisplayFadedClasses =
            !(isActive.value || isDefault.value) &&
            isFaded.value &&
            !column.shouldHighlight;
        const CanDisplayHighlightClasses =
            !isFaded.value && column.shouldHighlight;
        const CanDisplaySelectedClasses =
            canvasStore.hasActiveNode &&
            canvasStore.currentNodeActiveColumnIndex === ind &&
            canvasStore.currentActiveNode.data.table.name ===
                props.data.table.name &&
            isTableSelected.value;

        return {
            ...column,
            isDefault: CanDisplayDefaultClasses,
            isFaded: CanDisplayFadedClasses,
            shouldHighlight: CanDisplayHighlightClasses,
            isSelected: CanDisplaySelectedClasses,
            isTableSelected: isTableSelected.value,
        };
    });
});
const { onPaneClick } = useVueFlow();
const onClickEditColumn = (index: number) => {
    if (!isTableSelected.value) return;
    canvasStore.currentNodeActiveColumnIndex = index;
};
onMounted(() => {
    if (!isCreatingTable?.value ?? false) return;
    jellyAnimation(root.value);
});
onPaneClick(() => {
    isTableSelected.value = false;
});

watch(
    () => canvasStore.currentActiveNode,
    () => {
        if (canvasStore.currentActiveNode.id !== props.id) {
            isTableSelected.value = false;
            return;
        }
        isTableSelected.value = true;
    },
);
</script>

<template>
    <div ref="root" class="relative">
        <CustomNodeToolbar v-if="isTableSelected" />
        <VCircleHandle :node-id="props.id" :is-faded="isFaded" />
        <VPrimaryTableNode
            :is-default="isDefault"
            :is-active="isActive"
            :is-faded="isFaded"
        >
            <template #tableName>{{ props.data.table.name }}</template>
            <VTableNodeButton
                v-for="(column, index) in getColumns"
                :key="column.name"
                :is-default="column.isDefault"
                :is-faded="column.isFaded"
                :should-highlight="column.shouldHighlight"
                :is-selected="column.isSelected"
                :is-table-selected="column.isTableSelected"
                @click="onClickEditColumn(index)"
            >
                <template #name>{{ column.name }}</template>
                <template #type>{{ column.type }}</template>
                <template #keyConstraint>{{ column.keyConstraint }}</template>
            </VTableNodeButton>
        </VPrimaryTableNode>
    </div>
</template>
