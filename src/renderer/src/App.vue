<script setup lang="ts">
import TitleBar from '@components/Modules/TitleBar/TitleBar.vue';
import Canvas from '@components/Modules/Canvas/Canvas.vue';
import TableInformation from '@components/Modules/TableInformation/TableInformation.vue';
import { useDetectActiveNodeChange } from '@composables/useDetectActiveNodeChange';
import { useDarkMode } from '@composables/useDarkMode';
import { useVueFlow } from '@vue-flow/core';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';
import { ref } from 'vue';

const { activeNodeChanged } = useDetectActiveNodeChange();
const { onPaneClick } = useVueFlow();
const { toggleDarkMode } = useDarkMode();
const displayAddColumnForm = ref(false);

toggleDarkMode();
onPaneClick(() => {
    displayAddColumnForm.value = false;
});
activeNodeChanged(() => {
    displayAddColumnForm.value = false;
});
</script>

<template>
    <div class="text-black">
        <TitleBar />
        <div class="flex h-[calc(100vh-42px)] w-full dark:bg-dark-900">
            <div class="w-full max-w-[250px] dark:bg-dark-900"></div>
            <div class="w-full">
                <Canvas />
            </div>
            <div class="w-full max-w-[250px] dark:bg-dark-900">
                <OverlayScrollbarsComponent class="h-full overflow-y-scroll">
                    <TableInformation
                        v-model:display-add-column-form="displayAddColumnForm"
                    />
                </OverlayScrollbarsComponent>
            </div>
        </div>
    </div>
</template>
