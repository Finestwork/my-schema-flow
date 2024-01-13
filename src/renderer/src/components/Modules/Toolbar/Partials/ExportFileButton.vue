<script setup lang="ts">
import VToolbarButtonDropdown from '@components/Base/Dropdowns/VToolbarButtonDropdown.vue';
import VToolbarButtonDropdownItem from '@components/Base/Dropdowns/VToolbarButtonDropdownItem.vue';
import ExportIcon from '@components/Shared/Icons/ExportIcon.vue';
import {
    exportAsImage,
    exportToSQL,
    type TExportTypes,
} from '@utilities/ExportHelper';
import { vueFlowKey } from '@symbols/VueFlow';
import { inject } from 'vue';
import { useDarkMode } from '@composables/Miscellaneous/useDarkMode';

const vueFlow = inject(vueFlowKey);
const { isDarkMode } = useDarkMode();
const onClickExportSQL = () => {
    if (!vueFlow) return;
    const SQLScript = exportToSQL(
        vueFlow.getNodes.value,
        vueFlow.getEdges.value,
    );
    window.api.saveAsScript(SQLScript, ['sql']);
};
const onClickExportAsImage = (type: TExportTypes) => {
    if (!vueFlow) return;

    if (vueFlow.vueFlowRef.value) {
        const Wrapper = vueFlow.vueFlowRef.value.querySelector(
            '.vue-flow__transformationpane',
        );
        if (!Wrapper) return;

        const Options = {
            bgColor: isDarkMode.value ? '#090B10' : '#f8fafc',
        };
        exportAsImage(
            type,
            Wrapper as HTMLElement,
            vueFlow.getNodes.value,
            Options,
        );
    }
};
</script>

<template>
    <VToolbarButtonDropdown ref="btn">
        <ExportIcon />
        <template #tooltip>Export File</template>
        <template #float>
            <VToolbarButtonDropdownItem @click="onClickExportAsImage('png')">
                <template #text>Export To PNG</template>
            </VToolbarButtonDropdownItem>
            <VToolbarButtonDropdownItem @click="onClickExportAsImage('jpg')">
                <template #text>Export To JPG</template>
            </VToolbarButtonDropdownItem>
            <VToolbarButtonDropdownItem @click="onClickExportAsImage('svg')">
                <template #text>Export To SVG</template>
            </VToolbarButtonDropdownItem>

            <hr />

            <VToolbarButtonDropdownItem @click="onClickExportSQL">
                <template #text>Export To SQL</template>
            </VToolbarButtonDropdownItem>
            <VToolbarButtonDropdownItem @click="onClickExportSQL">
                <template #text>Export To SQLite</template>
            </VToolbarButtonDropdownItem>
        </template>
    </VToolbarButtonDropdown>
</template>
