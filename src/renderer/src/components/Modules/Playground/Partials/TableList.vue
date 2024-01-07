<script setup lang="ts">
import VPlaygroundAutoComplete from '@components/Base/Forms/VPlaygroundAutoComplete.vue';
import { usePlaygroundStore } from '@stores/Playground';
import {ref} from 'vue';

const playgroundStore = usePlaygroundStore();
const tableName = ref('hello');

const modifyScript = () => {
    playgroundStore.SQLScript = `SELECT * FROM ${playgroundStore.currentTable}`;
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
