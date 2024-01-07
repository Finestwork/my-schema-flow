<script setup lang="ts">
import VPlaygroundAutoComplete from '@components/Base/Forms/VPlaygroundAutoComplete.vue';
import { usePlaygroundStore } from '@stores/Playground';
import { ref } from 'vue';
import { getColumns, executeStatement, getRows } from '@utilities/PlaygroundHelper';

const playgroundStore = usePlaygroundStore();
const tableName = ref('hello');

const modifyScript = async () => {
    playgroundStore.SQLScript = `SELECT * FROM ${playgroundStore.currentTable}`;
    playgroundStore.currentColumns = getColumns(
        playgroundStore.db,
        playgroundStore.currentTable,
    );
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
