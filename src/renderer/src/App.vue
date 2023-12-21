<script setup lang="ts">
import TitleBar from '@components/Modules/TitleBar/TitleBar.vue';
import Toolbar from '@components/Modules/Toolbar/Toolbar.vue';
import Canvas from '@components/Modules/Canvas/Canvas.vue';
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
    <div class="h-[calc(100vh-52px-40px)]">
        <Canvas />
    </div>
</template>
