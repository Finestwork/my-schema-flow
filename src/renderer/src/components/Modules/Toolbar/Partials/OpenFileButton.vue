<script setup lang="ts">
import VToolbarButtonDropdown from '@components/Base/Dropdowns/VToolbarButtonDropdown.vue';
import VToolbarButtonDropdownItem from '@components/Base/Dropdowns/VToolbarButtonDropdownItem.vue';
import OpenFileIcon from '@components/Shared/Icons/OpenFileIcon.vue';
import { useFileImportHelper } from '@composables/Miscellaneous/useFileImportHelper';
import { useFileStore } from '@stores/File';
import { useHistoryStore } from '@stores/History';
import { useHistoryActions } from '@composables/History/useHistoryActions';
import { inject } from 'vue';
import { vueFlowKey } from '@symbols/VueFlow';

const fileStore = useFileStore();
const historyStore = useHistoryStore();
const { createHistory } = useHistoryActions();
const vueFlow = inject(vueFlowKey);
const { importDatabaseFile, importSQLScript } = useFileImportHelper();
const onClickImportDiagram = async () => {
    if (!vueFlow) return;
    const xx = await window.api.openFile();
    console.log(xx);
    // historyStore.$reset();
    // fileStore.$reset();
    // const Contents = JSON.parse(file);
    // fileStore.fileName = fileName;
    // fileStore.filePath = filePath[0];
    // fileStore.savedIndex = 0;
    // vueFlow.setNodes(() => Contents.nodes);
    // vueFlow.setEdges(() => Contents.edges);
    // createHistory('Initial Load');
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
            <VToolbarButtonDropdownItem @click="onClickImportDiagram">
                <template #text>Import Diagram</template>
            </VToolbarButtonDropdownItem>
        </template>
    </VToolbarButtonDropdown>
</template>
