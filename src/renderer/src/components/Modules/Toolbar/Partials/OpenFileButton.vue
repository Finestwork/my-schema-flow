<script setup lang="ts">
import VToolbarButtonDropdown from '@components/Base/Dropdowns/VToolbarButtonDropdown.vue';
import VToolbarButtonDropdownItem from '@components/Base/Dropdowns/VToolbarButtonDropdownItem.vue';
import VTooltipKeyboardText from '@components/Base/Texts/VTooltipKeyboardText.vue';
import OpenFileIcon from '@components/Shared/Icons/OpenFileIcon.vue';

const onClickImportDatabase = () => {
    window.api.openSchema('');
};
const onCickImportDDL = () => {
    window.api.openDDL('');
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

            <VToolbarButtonDropdownItem @click="onCickImportDDL">
                <template #text>Import DDL / SQL</template>
            </VToolbarButtonDropdownItem>

            <VToolbarButtonDropdownItem @click="onClickOpenFile">
                <template #text>Import Diagram</template>
            </VToolbarButtonDropdownItem>
        </template>
    </VToolbarButtonDropdown>
</template>
