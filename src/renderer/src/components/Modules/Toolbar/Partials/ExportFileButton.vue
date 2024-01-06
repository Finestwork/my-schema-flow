<script setup lang="ts">
import VToolbarButtonDropdown from '@components/Base/Dropdowns/VToolbarButtonDropdown.vue';
import VToolbarButtonDropdownItem from '@components/Base/Dropdowns/VToolbarButtonDropdownItem.vue';
import ExportSQLIcon from '@components/Shared/Icons/ExportSQLIcon.vue';
import { exportToSQL } from '@utilities/ExportHelper';
import { vueFlowKey } from '@symbols/VueFlow';
import { inject } from 'vue';

const vueFlow = inject(vueFlowKey);
const onClickExportSQL = () => {
    if (!vueFlow) return;
    const SQLScript = exportToSQL(
        vueFlow.getNodes.value,
        vueFlow.getEdges.value,
    );
    window.api.saveAsScript(SQLScript, ['sql']);
};
</script>

<template>
    <VToolbarButtonDropdown ref="btn">
        <ExportSQLIcon />
        <template #tooltip>Export To SQL Script</template>
        <template #float>
            <VToolbarButtonDropdownItem @click="onClickExportSQL">
                <template #text>Export To SQL</template>
            </VToolbarButtonDropdownItem>
            <VToolbarButtonDropdownItem @click="onClickExportSQL">
                <template #text>Export To SQLite</template>
            </VToolbarButtonDropdownItem>
        </template>
    </VToolbarButtonDropdown>
</template>
