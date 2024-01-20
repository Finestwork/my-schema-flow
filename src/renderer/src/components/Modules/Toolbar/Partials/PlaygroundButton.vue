<script setup lang="ts">
import VToolbarButtonIcon from '@components/Base/ButtonIcons/VToolbarButtonIcon.vue';
import CodeIcon from '@components/Shared/Icons/CodeIcon.vue';
import { useModalStore } from '@stores/Modal';

const modalStore = useModalStore();
</script>

<template>
    <VToolbarButtonIcon
        ref="btn"
        @click="modalStore.showPlaygroundModal = true"
    >
        <CodeIcon />
        <template #tooltip> MySQL Playground</template>
    </VToolbarButtonIcon>
</template>
