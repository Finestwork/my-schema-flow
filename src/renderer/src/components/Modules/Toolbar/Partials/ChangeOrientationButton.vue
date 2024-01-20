<script setup lang="ts">
import VToolbarButtonDropdown from '@components/Base/Dropdowns/VToolbarButtonDropdown.vue';
import VToolbarButtonDropdownItem from '@components/Base/Dropdowns/VToolbarButtonDropdownItem.vue';
import HorizontalLayoutIcon from '@components/Shared/Icons/HorizontalLayoutIcon.vue';
import VerticalLayoutIcon from '@components/Shared/Icons/VerticalLayoutIcon.vue';
import ChangeOrientationIcon from '@components/Shared/Icons/ChangeOrientationIcon.vue';
import { useSettingsStore } from '@stores/Settings';
import { useNodeAutoLayout } from '@composables/Nodes/useAutoLayout';
import { useHistoryActions } from '@composables/History/useHistoryActions';

const settingsStore = useSettingsStore();
const { autoLayout } = useNodeAutoLayout();
const { createHistory } = useHistoryActions();
let previousOrientation: 'TB' | 'LR' | string =
    settingsStore.currentOrientation;

const onClickChangeOrientation = (orientation: 'TB' | 'LR') => {
    if (previousOrientation === orientation) return;
    settingsStore.currentOrientation = orientation;
    previousOrientation = orientation;
    autoLayout();
    createHistory(
        `Changed Layout: ${orientation === 'TB' ? 'Vertical' : 'Horizontal'}`,
    );
};
</script>

<template>
    <VToolbarButtonDropdown>
        <ChangeOrientationIcon />
        <template #tooltip>Change Layout Orientation</template>
        <template #float>
            <VToolbarButtonDropdownItem
                :is-active="settingsStore.currentOrientation === 'LR'"
                @click="onClickChangeOrientation('LR')"
            >
                <template #icon>
                    <HorizontalLayoutIcon />
                </template>
                <template #text>Horizontal Layout</template>
            </VToolbarButtonDropdownItem>
            <VToolbarButtonDropdownItem
                :is-active="settingsStore.currentOrientation === 'TB'"
                @click="onClickChangeOrientation('TB')"
            >
                <template #icon>
                    <VerticalLayoutIcon />
                </template>
                <template #text>Vertical Layout</template>
            </VToolbarButtonDropdownItem>
        </template>
    </VToolbarButtonDropdown>
</template>
