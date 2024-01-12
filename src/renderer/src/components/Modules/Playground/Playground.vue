<script setup lang="ts">
import MainContent from '@components/Modules/Playground/Partials/MainContent.vue';
import VFullScreenModal from '@components/Base/Modals/VFullScreenModal.vue';
import TestConnection from '@components/Modules/Playground/Partials/TestConnection.vue';
import { useModalStore } from '@stores/Modal';
import { usePlaygroundStore } from '@stores/Playground';

const modalStore = useModalStore();
const playgroundStore = usePlaygroundStore();

const closeModal = () => {
    modalStore.showPlaygroundModal = false;
};
</script>

<template>
    <Teleport to="body">
        <VFullScreenModal @close-modal="closeModal">
            <MainContent v-if="playgroundStore.connection !== null" />
            <TestConnection v-else />
        </VFullScreenModal>
    </Teleport>
</template>
