<script setup lang="ts">
import VExportImageIcon from '@components/Shared/Icons/VExportImageIcon.vue';
import BaseButtonDropdown from '@components/Toolbar/Partials/BaseButtonDropdown.vue';
import BaseButtonDropdownItem from '@components/Toolbar/Partials/BaseButtonDropdownItem.vue';
import { exportTo } from '@utilities/ExportHelper';
import { useTableStore } from '@stores/TableStore';
import { ref } from 'vue';
import type { TSupportedTypes } from '@utilities/ExportHelper';
import type { GraphNode } from '@vue-flow/core';

const showLayout = ref(false);
const onClickExportToPng = (type: TSupportedTypes) => {
    const Wrapper = <HTMLElement>document.querySelector('.vue-flow__transformationpane');
    exportTo(type, Wrapper, useTableStore().elements as GraphNode[]);
    showLayout.value = false;
};
</script>

<template>
    <BaseButtonDropdown v-model:show-items="showLayout">
        <VExportImageIcon />
        <template #float>
            <BaseButtonDropdownItem @click="onClickExportToPng('png')">
                <template #text>Export To PNG</template>
            </BaseButtonDropdownItem>
            <BaseButtonDropdownItem @click="onClickExportToPng('jpg')">
                <template #text>Export To JPG</template>
            </BaseButtonDropdownItem>
            <BaseButtonDropdownItem @click="onClickExportToPng('svg')">
                <template #text>Export To SVG</template>
            </BaseButtonDropdownItem>
        </template>
        <template #tooltip>Export Image</template>
    </BaseButtonDropdown>
</template>
