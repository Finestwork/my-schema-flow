<script setup lang="ts">
import VToolbarButtonIcon from '@components/Base/ButtonIcons/VToolbarButtonIcon.vue';
import AutoLayoutIcon from '@components/Shared/Icons/AutoLayoutIcon.vue';
</script>

<template>
    <VToolbarButtonIcon>
        <AutoLayoutIcon />
        <template #tooltip>Run AutoLayout</template>
    </VToolbarButtonIcon>
</template>
