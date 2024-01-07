<script setup lang="ts">
import VFullScreenModal from '@components/Base/Modals/VFullScreenModal.vue';
import PanelFormSql from '@components/Modules/Playground/Partials/PanelFormSql.vue';
import ExecuteSqlButton from '@components/Modules/Playground/Partials/ExecuteSqlButton.vue';
import TableList from './Partials/TableList.vue';
import RowTable from './Partials/RowTable.vue';
import { usePlaygroundStore } from '@stores/Playground';
import { useModalStore } from '@stores/Modal';
import { executeStatement, getRows } from '@utilities/PlaygroundHelper';

const modalStore = useModalStore();
const playgroundStore = usePlaygroundStore();
const executeSQL = async () => {
    const result = await executeStatement(
        playgroundStore.db,
        playgroundStore.SQLScript,
        playgroundStore.currentTable
    );
    playgroundStore.result = result;
    const rows = await getRows(playgroundStore.db, playgroundStore.result);
    playgroundStore.resultRows = rows;
};

const closeModal = () => {
    modalStore.showPlaygroundModal = false;
    const db = playgroundStore.db;
    db.close();
    playgroundStore.$reset();
};
</script>
<template>
    <Teleport to="body">
        <VFullScreenModal @close-modal="closeModal">
            <TableList v-model="playgroundStore.currentTable" />
            <PanelFormSql v-model="playgroundStore.SQLScript" />
            <ExecuteSqlButton @click="executeSQL" />
            <RowTable />
        </VFullScreenModal>
    </Teleport>
</template>
