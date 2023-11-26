<script setup lang="ts">
import { VueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { MiniMap } from '@vue-flow/minimap';
import { Controls } from '@vue-flow/controls';
import { useTableStore } from '@stores/TableStore';

const tableStore = useTableStore();
</script>

<template>
    <div class="h-screen">
        <VueFlow v-model="tableStore.elements">
            <Background pattern-color="#6381b8" />
            <MiniMap />
            <Controls />
        </VueFlow>
    </div>
</template>
