<script setup lang="ts">
import VPanelWrapper from '@components/Base/Wrappers/VPanelWrapper.vue';
import TitleBar from '@components/Modules/TitleBar/TitleBar.vue';
import Toolbar from '@components/Modules/Toolbar/Toolbar.vue';
import Canvas from '@components/Modules/Canvas/Canvas.vue';
import HistorySection from '@components/Modules/HistorySection/HistorySection.vue';
import TableInformationSection from '@components/Modules/TableInformationSection/TableInformationSection.vue';
import { vueFlowKey } from '@symbols/VueFlow';
import { isCreatingTableKey } from '@symbols/Canvas';
import { useVueFlow } from '@vue-flow/core';
import { provide, ref } from 'vue';

const isCreatingTable = ref(false);
provide(vueFlowKey, useVueFlow());
provide(isCreatingTableKey, isCreatingTable);
</script>

<template>
    <TitleBar />
    <Toolbar />
    <div class="flex h-[calc(100vh-52px-40px)]">
        <VPanelWrapper class="h-full w-full max-w-[200px]">
            <HistorySection />
        </VPanelWrapper>
        <Canvas class="w-full" />
        <VPanelWrapper class="h-full w-full max-w-[250px]">
            <TableInformationSection />
        </VPanelWrapper>
    </div>
</template>
