<script setup lang="ts">
import VToolbarButtonDropdown from '@components/Base/Dropdowns/VToolbarButtonDropdown.vue';
import VToolbarButtonDropdownItem from '@components/Base/Dropdowns/VToolbarButtonDropdownItem.vue';
import OpenFileIcon from '@components/Shared/Icons/OpenFileIcon.vue';
import { useModalStore } from '@stores/Modal';
import { usePlaygroundStore } from '@stores/Playground';
import { useFileImportHelper } from '@composables/Miscellaneous/useFileImportHelper';
import {
    initializeDatabase,
    getTableList,
    initializeImportedDatabase,
} from '@utilities/PlaygroundHelper';
import { exportToSQL } from '@utilities/ExportHelper';
import { vueFlowKey } from '@symbols/VueFlow';
import { inject, nextTick } from 'vue';

const vueFlow = inject(vueFlowKey);
const { playgroundDatabaseFile } = useFileImportHelper();
const modalStore = useModalStore();
const playgroundStore = usePlaygroundStore();
const sqlPlayground = async () => {
    modalStore.showPlaygroundModal = !modalStore.showPlaygroundModal;
    await nextTick();

    const statement = exportToSQL(
        vueFlow.getNodes.value,
        vueFlow.getEdges.value,
    );
    playgroundStore.db = await initializeDatabase(statement);
    const tables = await getTableList(playgroundStore.db);
    playgroundStore.tables = tables[0].values.map((value) => value[0]);
};

const sqlImportPlayground = async () => {
    modalStore.showPlaygroundModal = !modalStore.showPlaygroundModal;
    await nextTick();
    const file = await playgroundDatabaseFile();
    playgroundStore.db = await initializeImportedDatabase(file);
    const tables = await getTableList(playgroundStore.db);
    playgroundStore.tables = tables[0].values.map((value) => value[0]);
};
</script>

<template>
    <VToolbarButtonDropdown ref="btn">
        <OpenFileIcon />
        <template #tooltip> SQL Playground</template>
        <template #float>
            <VToolbarButtonDropdownItem @click="sqlPlayground">
                <template #text>Run SQLite</template>
            </VToolbarButtonDropdownItem>
            <VToolbarButtonDropdownItem @click="sqlImportPlayground">
                <template #text>Import and Run SQLite</template>
            </VToolbarButtonDropdownItem>
        </template>
    </VToolbarButtonDropdown>
</template>
