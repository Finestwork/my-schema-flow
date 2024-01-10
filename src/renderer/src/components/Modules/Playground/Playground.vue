<script setup lang="ts">
import VFullScreenModal from '@components/Base/Modals/VFullScreenModal.vue';
import Result from '@components/Modules/Playground/Partials/Result.vue';
import TextEditor from '@components/Modules/Playground/Partials/TextEditor.vue';
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
            <div class="mt-10 h-full">
                <template v-if="playgroundStore.connection !== null">
                    <TextEditor />
                    <Result />
                </template>
                <TestConnection v-else />
            </div>
        </VFullScreenModal>
    </Teleport>
</template>
