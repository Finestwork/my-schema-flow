<script setup lang="ts">
import TitleBar from '@components/Modules/TitleBar/TitleBar.vue';
import Canvas from '@components/Modules/Canvas/Canvas.vue';
import TableInformation from '@components/Modules/TableInformation/TableInformation.vue';
import TableRelations from '@components/Modules/TableRelation/TableRelations.vue';
import { useDetectActiveNodeChange } from '@composables/useDetectActiveNodeChange';
import { useDarkMode } from '@composables/useDarkMode';
import { useVueFlow } from '@vue-flow/core';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';
import { reactive, ref } from 'vue';

const { activeNodeChanged } = useDetectActiveNodeChange();
const { getNodes, getEdges, onPaneClick } = useVueFlow();
const { toggleDarkMode } = useDarkMode();
const toggleDisplayForms = reactive({
    addColumn: false,
    editColumn: false,
});
const currentColumnIndex = ref(-1);
toggleDarkMode();
const resetStates = () => {
    toggleDisplayForms.addColumn = false;
    toggleDisplayForms.editColumn = false;
    currentColumnIndex.value = -1;
};
onPaneClick(resetStates);
activeNodeChanged(resetStates);
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
                        v-model:display-add-column-form="
                            toggleDisplayForms.addColumn
                        "
                        v-model:display-edit-column-form="
                            toggleDisplayForms.editColumn
                        "
                        v-model:current-column-index="currentColumnIndex"
                    />
                    <TableRelations :edges="getEdges" :nodes="getNodes" />
                </OverlayScrollbarsComponent>
            </div>
        </div>
    </div>
</template>
