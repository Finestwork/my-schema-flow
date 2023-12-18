<script setup lang="ts">
import { useCanvasStore } from '@stores/CanvasStore';

const canvasStore = useCanvasStore();
</script>
<template>
    <div class="text-xs font-semibold">
        <span class="block dark:text-slate-300">Current Table:</span>
        <span
            class="block truncate dark:text-slate-500 dark:placeholder-slate-600"
            >{{ canvasStore.currentActiveNode.data.table.name }}</span
        >
    </div>
</template>
