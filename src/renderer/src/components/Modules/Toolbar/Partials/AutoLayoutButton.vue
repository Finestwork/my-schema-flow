<script setup lang="ts">
import BaseToolbarButtonIcon from '@components/Modules/Toolbar/Partials/BaseToolbarButtonIcon.vue';
import AutoLayoutIcon from '@components/Shared/Icons/AutoLayoutIcon.vue';

const emits = defineEmits<{
    (e: 'click', value: MouseEvent): void;
}>();
</script>

<template>
    <BaseToolbarButtonIcon @click="emits('click', $event)">
        <AutoLayoutIcon />
        <template #tooltip>Run AutoLayout</template>
    </BaseToolbarButtonIcon>
</template>
