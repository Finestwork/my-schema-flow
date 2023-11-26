<script setup lang="ts">
import { VueFlow } from '@vue-flow/core';
import { useTableStore } from '@stores/TableStore';

const tableStore = useTableStore();
</script>

<template>
  <div class="h-screen">
    <VueFlow v-model="tableStore.elements"> </VueFlow>
  </div>
</template>
