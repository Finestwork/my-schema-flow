<script setup lang="ts">
import BaseButtonDropdownItem from '@components/Toolbar/Partials/BaseButtonDropdownItem.vue';
import VTBLayoutIcon from '@components/Shared/Icons/VTBLayoutIcon.vue';
import VLayoutOrientationIcon from '@components/Shared/Icons/VLayoutOrientationIcon.vue';
import BaseButtonDropdown from '@components/Toolbar/Partials/BaseButtonDropdown.vue';
import VLRLayoutIcon from '@components/Shared/Icons/VLRLayoutIcon.vue';
import { nodeAutolayout } from '@utilities/NodeHelper';
import { calculateEdgePosition } from '@utilities/NodeEdgeHelper';
import { useTableStore } from '@stores/TableStore';
import { ref } from 'vue';

const tableStore = useTableStore();
const showLayoutOrientationDropdown = ref(false);
const currentOrientation = ref('TB');
const onClickChangeLayoutOrientation = (orientation: 'TB' | 'LR' = 'TB') => {
    showLayoutOrientationDropdown.value = false;
    currentOrientation.value = orientation;
    const { nodes, edges } = nodeAutolayout(tableStore.elements, tableStore.edges, orientation);
    tableStore.elements = nodes;
    tableStore.edges = edges;
    tableStore.edges.forEach(calculateEdgePosition);
};
</script>

<template>
    <BaseButtonDropdown v-model:show-items="showLayoutOrientationDropdown">
        <VLayoutOrientationIcon />
        <template #float>
            <BaseButtonDropdownItem
                :is-active="currentOrientation === 'TB'"
                @click="onClickChangeLayoutOrientation('TB')"
            >
                <template #icon>
                    <VTBLayoutIcon />
                </template>
                <template #text>Top to bottom</template>
            </BaseButtonDropdownItem>
            <BaseButtonDropdownItem
                :is-active="currentOrientation === 'LR'"
                @click="onClickChangeLayoutOrientation('LR')"
            >
                <template #icon>
                    <VLRLayoutIcon />
                </template>
                <template #text>Left to right</template>
            </BaseButtonDropdownItem>
        </template>
        <template #tooltip> Change Layout Orientation</template>
    </BaseButtonDropdown>
</template>
