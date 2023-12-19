<script setup lang="ts">
import BaseToolbarButtonIcon from '@components/Modules/Toolbar/Partials/BaseToolbarButtonIcon.vue';
import UndoIcon from '@components/Shared/Icons/UndoIcon.vue';
</script>

<template>
    <BaseToolbarButtonIcon>
        <UndoIcon />
        <template #tooltip>Undo</template>
    </BaseToolbarButtonIcon>
</template>
