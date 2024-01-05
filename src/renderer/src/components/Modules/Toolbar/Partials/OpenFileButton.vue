<script setup lang="ts">
import VToolbarButtonDropdown from '@components/Base/Dropdowns/VToolbarButtonDropdown.vue';
import VToolbarButtonDropdownItem from '@components/Base/Dropdowns/VToolbarButtonDropdownItem.vue';
import OpenFileIcon from '@components/Shared/Icons/OpenFileIcon.vue';
import { useFileImportHelper } from '@composables/Miscellaneous/useFileImportHelper';

const { importDatabaseFile, importSQLScript } = useFileImportHelper();
const onClickOpenFile = () => {
    window.electron.ipcRenderer.send('openFile');
};
</script>

<template>
    <VToolbarButtonDropdown ref="btn">
        <OpenFileIcon />
        <template #tooltip> Open A File</template>
        <template #float>
            <VToolbarButtonDropdownItem @click="importDatabaseFile">
                <template #text>Import Database</template>
            </VToolbarButtonDropdownItem>
            <VToolbarButtonDropdownItem @click="importSQLScript">
                <template #text>Import DDL / SQL</template>
            </VToolbarButtonDropdownItem>
            <VToolbarButtonDropdownItem @click="onClickOpenFile">
                <template #text>Import Diagram</template>
            </VToolbarButtonDropdownItem>
        </template>
    </VToolbarButtonDropdown>
</template>
