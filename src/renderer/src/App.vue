<script setup lang="ts">
import TitleBar from '@components/Modules/TitleBar/TitleBar.vue';
import Canvas from '@components/Modules/Canvas/Canvas.vue';
import TableInformation from '@components/Modules/TableInformation/TableInformation.vue';
import TableRelations from '@components/Modules/TableRelation/TableRelations.vue';
import Toolbar from '@components/Modules/Toolbar/Toolbar.vue';
import { useTableRelation } from '@composables/useTableRelation';
import { useDetectActiveNodeChange } from '@composables/useDetectActiveNodeChange';
import { useDarkMode } from '@composables/useDarkMode';
import { useNodeAutoLayout } from '@composables/useNodeAutoLayout';
import { getEdgesKey, getNodesKey } from '@symbols/Canvas';
import { useVueFlow } from '@vue-flow/core';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';
import { reactive, ref, provide } from 'vue';

const toggleDisplayForms = reactive({
    addColumn: false,
    editColumn: false,
});
const currentColumnIndex = ref(-1);
const { activeNodeChanged } = useDetectActiveNodeChange();
const { getNodes, getEdges, onPaneClick } = useVueFlow();
const { toggleDarkMode } = useDarkMode();
const { addRelation, updateRelation } = useTableRelation();
const { autoLayout } = useNodeAutoLayout();
const resetStates = () => {
    toggleDisplayForms.addColumn = false;
    toggleDisplayForms.editColumn = false;
    currentColumnIndex.value = -1;
};
provide(getNodesKey, getNodes);
provide(getEdgesKey, getEdges);
toggleDarkMode();
onPaneClick(resetStates);
activeNodeChanged(resetStates);
</script>

<template>
    <div class="text-black">
        <TitleBar />
        <Toolbar @run-layout="autoLayout" @change-orientation="autoLayout" />
        <div class="flex h-[calc(100vh-42px-52px)] w-full dark:bg-dark-900">
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
                    <TableRelations
                        @add-relation="addRelation"
                        @update-relation="updateRelation"
                    />
                </OverlayScrollbarsComponent>
            </div>
        </div>
    </div>
</template>
