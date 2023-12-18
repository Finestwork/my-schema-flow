<script setup lang="ts">
import { useCanvasStore } from '@stores/CanvasStore';
import { computed } from 'vue';

const canvasStore = useCanvasStore();
const getTableName = computed(() => {
    if (canvasStore.hasActiveEdge) {
        return canvasStore.currentActiveEdge.targetNode.data.table.name;
    }

    return canvasStore.currentActiveNode.data.table.name;
});
</script>
<template>
    <div class="text-xs font-semibold">
        <span class="block dark:text-slate-300">Referencing Table:</span>
        <span
            class="block truncate dark:text-slate-500 dark:placeholder-slate-600"
            >{{ getTableName }}</span
        >
    </div>
</template>
