<script setup lang="ts">
import BaseButtonIcon from '@components/Toolbar/Partials/BaseButtonIcon.vue';
import VOpenFileIcon from '@components/Shared/Icons/VOpenFileIcon.vue';

const onClickOpenFile = () => {
    window.api.openFile();
};
</script>
<template>
    <BaseButtonIcon @click="onClickOpenFile">
        <VOpenFileIcon />
        <template #tooltip>Open File</template>
    </BaseButtonIcon>
</template>
