<script setup lang="ts">
import VFullScreenModal from '@components/Base/Modals/VFullScreenModal.vue';
import VAlertList from '@components/Base/Alerts/VAlertList.vue';
import VAlert from '@components/Base/Alerts/VAlert.vue';
import PanelFormSql from '@components/Modules/Playground/Partials/PanelFormSql.vue';
import ExecuteSqlButton from '@components/Modules/Playground/Partials/ExecuteSqlButton.vue';
import TableList from './Partials/TableList.vue';
import RowTable from './Partials/RowTable.vue';
import { usePlaygroundStore } from '@stores/Playground';
import { useModalStore } from '@stores/Modal';
import { executeStatement, getRows } from '@utilities/PlaygroundHelper';
import { ref, Ref } from 'vue';

const modalStore = useModalStore();
const playgroundStore = usePlaygroundStore();
const errors: Ref<Array<string>> = ref([]);
const executeSQL = async () => {
    errors.value = [];
    errors.value = await executeStatement(
        playgroundStore.db,
        playgroundStore.SQLScript,
        playgroundStore.currentTable,
    );
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
            <VAlertList
                v-if="errors.length !== 0"
                type="danger"
                class="mb-2.5 mt-6"
                :items="errors"
            ></VAlertList>
            <TableList v-model="playgroundStore.currentTable" />
            <PanelFormSql v-model="playgroundStore.SQLScript" />
            <ExecuteSqlButton @click="executeSQL" />
            <RowTable />
        </VFullScreenModal>
    </Teleport>
</template>
