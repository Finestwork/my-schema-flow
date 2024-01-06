<script setup lang="ts">
import VFullScreenModal from '@components/Base/Modals/VFullScreenModal.vue';
import PanelFormSql from '@components/Modules/Playground/Partials/PanelFormSql.vue';
import ExecuteSqlButton from '@components/Modules/Playground/Partials/ExecuteSqlButton.vue';
import { usePlaygroundStore } from '@stores/Playground';
import { useModalStore } from '@stores/Modal';
const modalStore = useModalStore();
const playgroundStore = usePlaygroundStore();

const executeSQL = () => {
    console.log(playgroundStore.SQLScript);
    PanelFormSql.modelValue = "";
}

</script>
<template>
    <Teleport to="body">
        <VFullScreenModal @close-modal="modalStore.showPlaygroundModal = false">
            <ExecuteSqlButton @click = "executeSQL"/>
            <PanelFormSql v-model="playgroundStore.SQLScript"/>
            
        </VFullScreenModal>
    </Teleport>
</template>
