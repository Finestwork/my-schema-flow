<script setup lang="ts">
import VFullScreenModal from '@components/Base/Modals/VFullScreenModal.vue';
import PanelFormSql from '@components/Modules/Playground/Partials/PanelFormSql.vue';
import ExecuteSqlButton from '@components/Modules/Playground/Partials/ExecuteSqlButton.vue';
import TableList from './Partials/TableList.vue';
import { usePlaygroundStore } from '@stores/Playground';
import { useModalStore } from '@stores/Modal';
import { executeStatement, getRows } from '@utilities/PlaygroundHelper';

const modalStore = useModalStore();
const playgroundStore = usePlaygroundStore();
const executeSQL = async () => {
    const result = await executeStatement(
        playgroundStore.db,
        playgroundStore.SQLScript,
    );
    playgroundStore.result = result;
    const rows = await getRows(playgroundStore.db, playgroundStore.result);
    playgroundStore.resultRows = rows;
};
</script>
<template>
    <Teleport to="body">
        <VFullScreenModal @close-modal="modalStore.showPlaygroundModal = false">
            <TableList v-model="playgroundStore.currentTable" />
            <PanelFormSql v-model="playgroundStore.SQLScript" />
            <ExecuteSqlButton @click="executeSQL" />

            <!-- TODO: Table Component -->
            <table class="table-auto w-full">
                <thead>
                    <tr>
                        <td
                            v-for="row in playgroundStore.currentColumns"
                            :key="row"
                        >
                            {{ row }}
                        </td>
                    </tr>
                </thead>
                <tbody> 
                    <tr v-for="row in playgroundStore.resultRows" :key = "row"> 
                        <td v-for="data in row" :key="data">
                            {{ data }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </VFullScreenModal>
    </Teleport>
</template>
