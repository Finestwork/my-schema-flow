<script setup lang="ts">
import VPanelSectionWrapper from '@components/Shared/Layouts/VPanelSectionWrapper.vue';
import { useHistoryStore } from '@stores/HistoryStore';
import { computed, ref } from 'vue';

const history = useHistoryStore();
const showForm = ref(true);
</script>
<template>
    <VPanelSectionWrapper :show-form="showForm">
        <template #label>History</template>
        <div>
            <button
                class="mb-1 block w-full rounded p-1.5 text-left text-xs font-semibold text-slate-300 outline-none last-of-type:mb-1.5 dark:bg-dark-700 dark:hover:bg-blue-600/10 dark:hover:text-blue-500 dark:focus:bg-blue-600/10"
                v-for="(item, ind) in history.getHistoryDisplay"
                :key="`${item}${ind}`"
            >
                {{ item }}
            </button>
        </div>
    </VPanelSectionWrapper>
</template>
