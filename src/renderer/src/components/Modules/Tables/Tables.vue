<script setup lang="ts">
import VPanelSectionWrapper from '@components/Base/Wrappers/VPanelSectionWrapper.vue';
import { vueFlowKey } from '@symbols/VueFlow';
import { computed, inject } from 'vue';

const vueFlow = inject(vueFlowKey);
const getTableList = computed(() => {
    if (!vueFlow) return [];
    return vueFlow.getNodes.value.map(node => ({
        id: node.id,
        name: node.data.table.name
    }));
});
</script>

<template>
    <VPanelSectionWrapper>
        <template #label>Tables</template>
        <template #content>
            <span class="text-[.7rem] block mt-2 mb-1 font-semibold text-slate-500 dark:text-dark-400">Total: {{getTableList.length}}</span>
            <button v-for="table in getTableList" :key="table.id" class="mb-0.5 last-of-type:mb-0 text-xs font-semibold text-dark-500 w-full text-left rounded dark:text-dark-50 hover:bg-slate-300 dark:hover:bg-cyan-950/50 dark:hover:text-cyan-500 px-1.5 py-2" type="button">{{ table.name }}</button>
        </template>
    </VPanelSectionWrapper>
</template>
