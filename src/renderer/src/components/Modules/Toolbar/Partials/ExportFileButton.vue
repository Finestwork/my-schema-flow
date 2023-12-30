<script setup lang="ts">
import VToolbarButtonDropdown from '@components/Base/Dropdowns/VToolbarButtonDropdown.vue';
import VToolbarButtonDropdownItem from '@components/Base/Dropdowns/VToolbarButtonDropdownItem.vue';
import ExportSQLIcon from '@components/Shared/Icons/ExportSQLIcon.vue';

import { vueFlowKey } from '@symbols/VueFlow';
import { inject } from 'vue';
import exportMySql from '@utilities/ExportSqlHelper';

const vueFlow = inject(vueFlowKey);
</script>

<template>
    <VToolbarButtonDropdown ref="btn">
        <ExportSQLIcon />
        <template #tooltip>Export as File</template>
        <template #float>
            <VToolbarButtonDropdownItem
                @click="
                    exportMySql(
                        vueFlow?.getNodes?.value ?? [],
                        vueFlow?.getEdges?.value ?? [],
                    )
                "
            >
                <template #text>Export To MySQL</template>
            </VToolbarButtonDropdownItem>

            <VToolbarButtonDropdownItem
                @click="
                    exportMySql(
                        vueFlow?.getNodes?.value ?? [],
                        vueFlow?.getEdges?.value ?? [],
                    )
                "
            >
                <template #text>Export To SQLite</template>
            </VToolbarButtonDropdownItem>
        </template>
    </VToolbarButtonDropdown>
</template>
