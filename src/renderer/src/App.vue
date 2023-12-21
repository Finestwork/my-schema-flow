<script setup lang="ts">
import TitleBar from '@components/Modules/TitleBar/TitleBar.vue';
import Toolbar from '@components/Modules/Toolbar/Toolbar.vue';
import { vueFlowKey } from '@symbols/VueFlow';
import { isCreatingTableKey } from '@symbols/Canvas';
import { useVueFlow } from '@vue-flow/core';
import { provide, ref } from 'vue';

const isCreatingTable = ref(false);
provide(vueFlowKey, useVueFlow());
provide(isCreatingTableKey, isCreatingTable);
</script>

<template>
    <TitleBar />
    <Toolbar />
</template>
