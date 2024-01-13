<script setup lang="ts">
import VPanelWrapper from '@components/Base/Wrappers/VPanelWrapper.vue';
import TitleBar from '@components/Modules/TitleBar/TitleBar.vue';
import Toolbar from '@components/Modules/Toolbar/Toolbar.vue';
import Canvas from '@components/Modules/Canvas/Canvas.vue';
import HistorySection from '@components/Modules/HistorySection/HistorySection.vue';
import TableInformationSection from '@components/Modules/TableInformationSection/TableInformationSection.vue';
import TableList from '@components/Modules/Tables/Tables.vue';
import TableRelations from '@components/Modules/TableRelations/TableRelations.vue';
import Settings from '@components/Modules/Settings/Settings.vue';
import Playground from '@components/Modules/Playground/Playground.vue';
import DiagramModalLoader from '@components/Modules/DiagramModalLoader/DiagramModalLoader.vue';
import { useModalStore } from '@stores/Modal';
import { useSettingsStore } from '@stores/Settings';
import { useFileStore } from '@stores/File';
import { vueFlowKey } from '@symbols/VueFlow';
import { useTitle } from '@vueuse/core';
import { isCreatingTableKey } from '@symbols/Canvas';
import { useVueFlow } from '@vue-flow/core';
import { provide, ref, watch } from 'vue';

const modalStore = useModalStore();
const settingsStore = useSettingsStore();
const fileStore = useFileStore();
const isCreatingTable = ref(false);
const title = useTitle();
provide(vueFlowKey, useVueFlow());
provide(isCreatingTableKey, isCreatingTable);

watch(
    () => fileStore.fileName,
    (fileName) => {
        if (fileName.trim() === '') return;
        const FileName = fileStore.getFileNameWithoutExt;
        title.value = `MySchemaFlow — ${FileName}`;
    },
);
</script>

<template>
    <TitleBar />
    <Toolbar />
    <div
        v-if="!modalStore.showPlaygroundModal"
        class="flex h-[calc(100vh-52px-48px)]"
    >
        <VPanelWrapper
            class="h-full w-full max-w-[250px] border-r-2 border-r-slate-300 dark:border-r-dark-700"
        >
            <TableList />
            <HistorySection />
        </VPanelWrapper>
        <Canvas class="w-full" />
        <VPanelWrapper
            class="h-full w-full max-w-[280px] border-l-2 border-l-slate-300 dark:border-l-dark-700"
        >
            <TableInformationSection />
            <TableRelations />
        </VPanelWrapper>
    </div>
    <Settings v-if="settingsStore.showSettings" />
    <Playground v-if="modalStore.showPlaygroundModal" />
    <DiagramModalLoader v-if="modalStore.showDiagramLoaderModal" />
</template>
