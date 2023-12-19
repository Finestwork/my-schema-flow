<script setup lang="ts">
import BaseToolbarButtonIcon from '@components/Modules/Toolbar/Partials/BaseToolbarButtonIcon.vue';
import AutoLayoutIcon from '@components/Shared/Icons/AutoLayoutIcon.vue';
</script>

<template>
    <BaseToolbarButtonIcon>
        <AutoLayoutIcon />
        <template #tooltip>Run AutoLayout</template>
    </BaseToolbarButtonIcon>
</template>
