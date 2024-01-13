<script setup lang="ts">
import FieldCount from '@components/Modules/Playground/Partials/Result/Partials/FieldCount.vue';
import ColumnResults from '@components/Modules/Playground/Partials/Result/Partials/ColumnResults.vue';
import PlainResults from '@components/Modules/Playground/Partials/Result/Partials/PlainResults.vue';
import { ref, watch } from 'vue';
import { getLastResultFromQuery } from '@utilities/MySQLHelper';
import { usePlaygroundStore } from '@stores/Playground';
import {
    ProcedureCallPacket,
    ResultSetHeader,
    RowDataPacket,
} from 'mysql2/typings/mysql/lib/protocol/packets';

type TMysqlReturnedData =
    | ResultSetHeader
    | ResultSetHeader[]
    | RowDataPacket[]
    | RowDataPacket[][]
    | ProcedureCallPacket;

type TMySQLConnectionReturn = {
    result: TMysqlReturnedData | null;
    error: {
        message: string;
    } | null;
};

const props = defineProps<{
    result: TMySQLConnectionReturn | Record<string, never>;
}>();
const playgroundStore = usePlaygroundStore();
const error = ref('');
const databaseResults = ref<Array<string>>([]);
const tableResults = ref<Array<string>>([]);
const affectedRows = ref(-1);
const selectedRows = ref<Array<{ [k: string]: string }>>([]);
const hasNoResult = ref(false);

watch(
    () => props.result,
    (result) => {
        const { error: QueryError, result: QueryResult } = result;

        tableResults.value = [];
        affectedRows.value = -1;
        selectedRows.value = [];
        hasNoResult.value = false;
        databaseResults.value = [];
        error.value = '';

        if (QueryError !== null) {
            error.value = QueryError.message;
            return;
        }

        const LastResult = getLastResultFromQuery(QueryResult);

        const displayResult = (item: { [k: string]: string }) => {
            const Keys = Object.keys(item);

            if (Keys.includes('Database')) {
                databaseResults.value = LastResult.map(
                    (result) => Object.values(result)[0],
                );
                return;
            }

            if (Keys.includes(`Tables_in_${playgroundStore.database}`)) {
                tableResults.value = LastResult.map(
                    (result) => Object.values(result)[0],
                );
                return;
            }

            if (Keys.includes('fieldCount')) {
                affectedRows.value = LastResult.affectedRows;
                return;
            }

            // Could SELECT keyword or anything that will view the result
            selectedRows.value = LastResult;
        };

        if (LastResult.length === 0) {
            hasNoResult.value = true;
            return;
        }

        // If the last result is array of arrays, then mysql executed too many statements
        if (Array.isArray(LastResult)) {
            const Item = LastResult[0];
            displayResult(Item);
            return;
        }

        // The user probably executed only one statement, hence, returned array of object
        displayResult(LastResult);
    },
);
</script>
<template>
    <div class="mt-4">
        <PlainResults
            v-if="
                tableResults.length !== 0 &&
                databaseResults.length === 0 &&
                affectedRows === -1 &&
                selectedRows.length === 0 &&
                !hasNoResult &&
                error === ''
            "
            :items="tableResults"
        >
            <template #header>Tables</template>
        </PlainResults>
        <PlainResults
            v-if="
                databaseResults.length !== 0 &&
                tableResults.length === 0 &&
                affectedRows === -1 &&
                selectedRows.length === 0 &&
                !hasNoResult &&
                error === ''
            "
            :items="databaseResults"
        >
            <template #header>Database</template>
        </PlainResults>
        <ColumnResults
            v-if="
                databaseResults.length === 0 &&
                tableResults.length === 0 &&
                affectedRows === -1 &&
                selectedRows.length !== 0 &&
                error === ''
            "
            :columns="selectedRows"
        />
        <FieldCount
            v-if="
                databaseResults.length === 0 &&
                tableResults.length === 0 &&
                affectedRows !== -1 &&
                selectedRows.length === 0 &&
                !hasNoResult &&
                error === ''
            "
        >
            {{ affectedRows }}
        </FieldCount>

        <p
            v-if="
                databaseResults.length === 0 &&
                tableResults.length === 0 &&
                affectedRows === -1 &&
                selectedRows.length === 0 &&
                hasNoResult &&
                error === ''
            "
            class="text-xs font-semibold text-slate-700 dark:text-slate-500"
        >
            No Result
        </p>

        <p
            v-if="
                databaseResults.length === 0 &&
                tableResults.length === 0 &&
                affectedRows === -1 &&
                selectedRows.length === 0 &&
                !hasNoResult &&
                error !== ''
            "
            class="text-xs font-semibold text-rose-600 dark:text-rose-500"
        >
            {{ error }}
        </p>
    </div>
</template>
