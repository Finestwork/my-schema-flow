<script setup lang="ts">
import VTableIcon from '@components/Shared/Icons/VTableIcon.vue';
import VAutoLayoutIcon from '@components/Shared/Icons/VAutoLayoutIcon.vue';
import VLayoutOrientationIcon from '@components/Shared/Icons/VLayoutOrientationIcon.vue';
import VTBLayoutIcon from '@components/Shared/Icons/VTBLayoutIcon.vue';
import VLRLayoutIcon from '@components/Shared/Icons/VLRLayoutIcon.vue';
import BaseButtonIcon from '@components/Toolbar/Partials/BaseButtonIcon.vue';
import BaseButtonDropdown from '@components/Toolbar/Partials/BaseButtonDropdown.vue';
import BaseButtonDropdownItem from '@components/Toolbar/Partials/BaseButtonDropdownItem.vue';
import ExportButton from '@components/Toolbar/Partials/ExportButton.vue';
import { useTableStore } from '@stores/TableStore';
import { useSettingsStore } from '@stores/SettingsStore';
import { calculateEdgePosition } from '@utilities/NodeEdgeHelper';
import { nodeAutolayout } from '@utilities/NodeHelper';
import { ref } from 'vue';

const tableStore = useTableStore();
const settingsStore = useSettingsStore();
const showLayoutOrientationDropdown = ref(false);
const currentOrientation = ref('TB');

const onClickCreateTable = () => {
    tableStore.isCreatingTable = true;
};
const onClickRunAutoLayout = () => {
    settingsStore.runAutoLayout = true;
};
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
    <div class="flex px-2 py-3 dark:bg-dark-850">
        <BaseButtonIcon class="mr-2" @click="onClickCreateTable">
            <VTableIcon />
            <template #tooltip>Create Table</template>
        </BaseButtonIcon>
        <BaseButtonIcon class="mr-2" @click="onClickRunAutoLayout">
            <VAutoLayoutIcon />
            <template #tooltip>Auto Layout</template>
        </BaseButtonIcon>
        <BaseButtonDropdown v-model:show-items="showLayoutOrientationDropdown" class="mr-2">
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
        <ExportButton />
    </div>
</template>
