<script setup lang="ts">
import VPlaygroundAutoComplete from '@components/Base/Forms/VPlaygroundAutoComplete.vue';
import { usePlaygroundStore } from '@stores/Playground';
import {
    getColumns,
    executeStatement,
    getRows,
} from '@utilities/PlaygroundHelper';
import { ref } from 'vue';

const playgroundStore = usePlaygroundStore();
const tableName = ref('hello');

const modifyScript = async () => {
    if (playgroundStore.currentTable === '') {
        playgroundStore.SQLScript = '';
    } else {
        playgroundStore.SQLScript = `SELECT * FROM ${playgroundStore.currentTable}`;
    }

    playgroundStore.currentColumns = getColumns(
        playgroundStore.db,
        playgroundStore.currentTable,
    );
    await executeStatement(
        playgroundStore.db,
        playgroundStore.SQLScript,
        playgroundStore.currentTable,
    )
    const rows = await getRows(playgroundStore.db, playgroundStore.result);
    playgroundStore.resultRows = rows;
};
</script>

<template>
    <VPlaygroundAutoComplete
        id="tableList"
        v-model="tableName"
        placeholder="Tables"
        :dropdown-items="playgroundStore.tables"
        @click="modifyScript"
    >
        <template #label>Tables:</template>
    </VPlaygroundAutoComplete>
</template>
