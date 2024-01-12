<script setup lang="ts">
import MainContent from '@components/Modules/Playground/Partials/MainContent.vue';
import VFullScreenModal from '@components/Base/Modals/VFullScreenModal.vue';
import DatabaseConnectionForm from '@components/Modules/Playground/Partials/DatabaseConnectionForm.vue';
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
            <MainContent
                v-if="
                    playgroundStore.connection !== null &&
                    playgroundStore.database.trim() !== ''
                "
            />
            <DatabaseConnectionForm v-else />
        </VFullScreenModal>
    </Teleport>
</template>
