<script setup lang="ts">
import BaseToolbarButtonIcon from '@components/Modules/Toolbar/Partials/BaseToolbarButtonIcon.vue';
import RedoIcon from '@components/Shared/Icons/RedoIcon.vue';
</script>
<template>
    <BaseToolbarButtonIcon>
        <RedoIcon />
        <template #tooltip>Redo</template>
    </BaseToolbarButtonIcon>
</template>
