<script setup lang="ts">
import VToolbarButtonIcon from '@components/Base/ButtonIcons/VToolbarButtonIcon.vue';
import AutoLayoutIcon from '@components/Shared/Icons/AutoLayoutIcon.vue';
import { useNodeAutoLayout } from '@composables/Nodes/useAutoLayout';
const { autoLayout } = useNodeAutoLayout();
</script>

<template>
    <VToolbarButtonIcon @click="autoLayout">
        <AutoLayoutIcon />
        <template #tooltip>Run AutoLayout</template>
    </VToolbarButtonIcon>
</template>
