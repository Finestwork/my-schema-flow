<script setup lang="ts">
import VPanelSectionWrapper from '@components/Base/Layouts/VPanelSectionWrapper.vue';
import { useHistoryStore } from '@stores/HistoryStore';

const historyStore = useHistoryStore();
</script>

<template>
    <VPanelSectionWrapper>
        <template #label>History</template>
        <template #content>
            <button
                v-for="(history, ind) in historyStore.getHistoryDisplay"
                :key="`${history}-${ind}`"
                class="mb-2 block w-full rounded px-2 py-1.5 text-left text-[.6rem] font-bold outline-none last-of-type:mb-0 dark:bg-dark-700/40 dark:text-slate-400 hover:dark:bg-cyan-950/40 hover:dark:text-cyan-500 focus:dark:bg-cyan-950/40 focus:dark:text-cyan-500"
                type="button"
            >
                {{ history }}
            </button>
        </template>
    </VPanelSectionWrapper>
</template>
