<script setup lang="ts">
import VTableNavigateButton from '@components/Base/Buttons/VTableNavigateButton.vue';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';
import { chunk } from 'lodash';
import { computed, ref } from 'vue';

const props = defineProps<{
    columns: Array<{ [k: string]: string }>;
}>();
const currentPage = ref(0);
const getColumns = computed(() => {
    return props.columns.map((col) => Object.keys(col))[0];
});
const getValues = computed(() => {
    const Array = props.columns.map((col) => Object.values(col));
    return chunk(Array, 20);
});
const onClickPrevPage = () => {
    if (currentPage.value === 0) return;
    currentPage.value--;
};
const onClickNextPage = () => {
    if (currentPage.value === getValues.value.length - 1) return;
    currentPage.value++;
};
</script>

<template>
    <div>
        <div
            v-if="getValues.length > 1"
            class="justify-left mb-2 ml-2 mt-2 flex"
        >
            <VTableNavigateButton
                :disabled="currentPage === 0"
                class="mr-2"
                @click="onClickPrevPage"
                >Back
            </VTableNavigateButton>
            <VTableNavigateButton
                :disabled="currentPage === getValues.length - 1"
                @click="onClickNextPage"
                >Next
            </VTableNavigateButton>
        </div>
        <OverlayScrollbarsComponent>
            <table
                class="w-full border-2 border-slate-300 pl-2 text-xs dark:border-dark-500"
            >
                <thead>
                    <tr>
                        <th
                            v-for="column in getColumns"
                            :key="column"
                            class="border-r-slate-[#98a5b6] border-r-2 bg-slate-300 text-left font-bold text-slate-500 last-of-type:border-r-0 dark:border-dark-500 dark:border-r-dark-600 dark:bg-dark-800/50 dark:text-slate-400"
                        >
                            <span class="block p-2">
                                {{ column }}
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody class="font-bold">
                    <tr
                        v-for="(items, index) in getValues[currentPage]"
                        :key="`${items[0]}-${index}`"
                        class="bg-slate-200/50 text-slate-700 odd:bg-transparent dark:bg-dark-800 dark:text-slate-400"
                    >
                        <td
                            v-for="(item, ind) in items"
                            :key="`${item}-${ind}`"
                            class="border-r-slate-[#98a5b6] border-r-2 font-semibold last-of-type:border-r-0 dark:border-r-dark-600"
                        >
                            <span class="block p-2">
                                {{ item }}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </OverlayScrollbarsComponent>
        <div v-if="getValues.length > 1" class="mb-2 mt-2 flex justify-center">
            <VTableNavigateButton
                class="mr-2"
                :disabled="currentPage === 0"
                @click="onClickPrevPage"
                >Back
            </VTableNavigateButton>
            <VTableNavigateButton
                :disabled="currentPage === getValues.length - 1"
                @click="onClickNextPage"
                >Next
            </VTableNavigateButton>
        </div>
    </div>
</template>
