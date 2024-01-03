<script setup lang="ts">
import VToolbarButtonDropdown from '@components/Base/Dropdowns/VToolbarButtonDropdown.vue';
import VToolbarButtonDropdownItem from '@components/Base/Dropdowns/VToolbarButtonDropdownItem.vue';
import VTooltipKeyboardText from '@components/Base/Texts/VTooltipKeyboardText.vue';
import OpenFileIcon from '@components/Shared/Icons/OpenFileIcon.vue';
import { useNodeAutoLayout } from '@composables/Nodes/useAutoLayout';

const { autoLayout } = useNodeAutoLayout();
const onClickImportDatabase = () => {
    window.api.openSchema('');
    autoLayout();
};
const onClickOpenFile = () => {
    window.electron.ipcRenderer.send('openFile');
};
</script>

<template>
    <VToolbarButtonDropdown ref="btn">
        <OpenFileIcon />
        <template #tooltip>
            <VTooltipKeyboardText :mac="['⌘', 'O']" :windows="['Ctrl', 'O']">
                <template #label>Open A File</template>
            </VTooltipKeyboardText></template
        >
        <template #float>
            <VToolbarButtonDropdownItem @click="onClickImportDatabase">
                <template #text>Import Database</template>
            </VToolbarButtonDropdownItem>

            <VToolbarButtonDropdownItem @click="onClickOpenFile">
                <template #text>Import Diagram</template>
            </VToolbarButtonDropdownItem>
        </template>
    </VToolbarButtonDropdown>
</template>
