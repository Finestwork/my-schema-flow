<script setup lang="ts">
import MainContent from '@components/Modules/Playground/Partials/MainContent.vue';
import VFullScreenModal from '@components/Base/Modals/VFullScreenModal.vue';
import DatabaseConnection from '@components/Modules/Playground/Partials/DatabaseConnection/DatabaseConnection.vue';
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
        <VFullScreenModal id="playgroundModal" @close-modal="closeModal">
            <MainContent
                v-if="
                    playgroundStore.connection !== null &&
                    playgroundStore.database.trim() !== ''
                "
            />
            <DatabaseConnection v-else />
        </VFullScreenModal>
    </Teleport>
</template>
