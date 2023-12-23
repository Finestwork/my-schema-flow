<script setup lang="ts">
import VToolbarButtonDropdown from '@components/Base/Dropdowns/VToolbarButtonDropdown.vue';
import VToolbarButtonDropdownItem from '@components/Base/Dropdowns/VToolbarButtonDropdownItem.vue';
import ExportImageIcon from '@components/Shared/Icons/ExportImageIcon.vue';
import { exportAsImage } from '@utilities/ExportHelper';
import { vueFlowKey } from '@symbols/VueFlow';
import { inject } from 'vue';
import type { TExportTypes } from '@utilities/ExportHelper';

const VueFlow = inject(vueFlowKey);
const onClickExportAsImage = (type: TExportTypes) => {
    if (!VueFlow) return;

    if (VueFlow.vueFlowRef.value) {
        const Wrapper = VueFlow.vueFlowRef.value.querySelector(
            '.vue-flow__transformationpane',
        );
        if (!Wrapper) return;

        exportAsImage(type, Wrapper as HTMLElement, VueFlow.getNodes.value);
    }
};
</script>

<template>
    <VToolbarButtonDropdown ref="btn">
        <ExportImageIcon />
        <template #tooltip>Export As Image</template>
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
        </template>
    </VToolbarButtonDropdown>
</template>
