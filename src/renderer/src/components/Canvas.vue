<script setup lang='ts'>
import {VueFlow} from "@vue-flow/core";
import {useTableStore} from "@stores/TableStore";

const tableStore = useTableStore();
</script>

<template>
  <VueFlow v-model="tableStore.elements">

  </VueFlow>
</template>
