<script setup lang="ts">
import VToolbarButtonDropdown from '@components/Base/Dropdowns/VToolbarButtonDropdown.vue';
import VToolbarButtonDropdownItem from '@components/Base/Dropdowns/VToolbarButtonDropdownItem.vue';
import OpenFileIcon from '@components/Shared/Icons/OpenFileIcon.vue';
import { useFileImportHelper } from '@composables/Miscellaneous/useFileImportHelper';

const { importSQLScript, importDiagram } = useFileImportHelper();
</script>

<template>
    <VToolbarButtonDropdown ref="btn">
        <OpenFileIcon />
        <template #tooltip> Import File</template>
        <template #float>
            <VToolbarButtonDropdownItem @click="importSQLScript">
                <template #text>Import SQL Script File</template>
            </VToolbarButtonDropdownItem>
            <VToolbarButtonDropdownItem @click="importDiagram">
                <template #text>Import Diagram File</template>
            </VToolbarButtonDropdownItem>
        </template>
    </VToolbarButtonDropdown>
</template>
