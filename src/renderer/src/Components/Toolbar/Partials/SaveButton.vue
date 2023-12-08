<script setup lang="ts">
import { useTableStore } from '@stores/TableStore';
import { onMounted } from 'vue';

const tableStore = useTableStore();

const onClickSaveFile = () => {
    const Contents = {
        elements: tableStore.elements,
        edges: tableStore.edges,
    };
    window.api.saveFile(JSON.stringify(Contents));
};
</script>

<template>
    <button
        class="duration-750 rounded px-3 py-2 text-xs font-semibold outline-none transition-shadow ease-in-out dark:bg-blue-500 dark:text-white dark:shadow-[0_0_10px_2px_#3b82f663] dark:hover:shadow-[0_0_10px_0px_#3b82f663] dark:focus:shadow-[0_0_10px_0px_#3b82f663]"
        type="button"
        @click="onClickSaveFile"
    >
        Save
    </button>
</template>
