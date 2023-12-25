<script setup lang="ts">
import VPanelSectionWrapper from '@components/Base/Wrappers/VPanelSectionWrapper.vue';
import VTooltip from '@components/Base/Floaters/VTooltip.vue';
import { useHistoryActions } from '@composables/History/useHistoryActions';
import { useHistoryStore } from '@stores/History';

const { jumpHistory } = useHistoryActions();
const historyStore = useHistoryStore();
</script>

<template>
    <VPanelSectionWrapper>
        <template #label>History</template>
        <template #content>
            <VTooltip
                v-for="(history, ind) in historyStore.getHistoryDisplay"
                :key="`${history}-${ind}`"
                class="mb-2 w-full last-of-type:mb-0"
                placement="right"
            >
                <button
                    class="block w-full truncate rounded px-2 py-1.5 text-left text-[.6rem] font-bold outline-none"
                    :class="{
                        'bg-cyan-600 text-cyan-50 dark:bg-cyan-950/40 dark:text-cyan-500':
                            ind === historyStore.currentIndex,
                        'bg-dark-50/40 text-slate-600 hover:bg-dark-50/50 focus:bg-dark-50/50 dark:bg-dark-700/40 dark:text-slate-400 hover:dark:bg-cyan-950/40 hover:dark:text-cyan-500 focus:dark:bg-cyan-950/40 focus:dark:text-cyan-500':
                            ind !== historyStore.currentIndex,
                    }"
                    type="button"
                    @click="jumpHistory(ind)"
                >
                    {{ history }}
                </button>
                <template #tooltip>{{ history }}</template>
            </VTooltip>
        </template>
    </VPanelSectionWrapper>
</template>
