<script setup lang="ts">
import VUniversalButton from '@components/Base/Buttons/VUniversalButton.vue';
import VAlert from '@components/Base/Alerts/VAlert.vue';
import TextEditor from '@components/Modules/Playground/Partials/MainContentTextEditor.vue';
import FieldCount from '@components/Modules/Playground/Partials/MainContentFieldCount.vue';
import NoResult from '@components/Modules/Playground/Partials/MainContentNoResult.vue';
import ColumnResults from '@components/Modules/Playground/Partials/MainContentColumnResults.vue';
import PlainResults from '@components/Modules/Playground/Partials/MainContentPlainResults.vue';
import { usePlaygroundStore } from '@stores/Playground';
import { checkUseKeywordExistence } from '@utilities/Editor/LineValidatorHelper';
import { getLastResultFromQuery } from '@utilities/MySQLHelper';
import { exportToSQL } from '@utilities/ExportHelper';
import { vueFlowKey } from '@symbols/VueFlow';
import { computed, ref, inject } from 'vue';

const playgroundStore = usePlaygroundStore();
const error = ref('');
const databaseResults = ref<Array<string>>([]);
const tableResults = ref<Array<string>>([]);
const affectedRows = ref(-1);
const selectedRows = ref<Array<{ [k: string]: string }>>([]);
const hasNoResult = ref(false);
const displayBottomView = computed(() => {
    return (
        tableResults.value.length !== 0 ||
        databaseResults.value.length !== 0 ||
        affectedRows.value !== -1 ||
        selectedRows.value.length !== 0 ||
        hasNoResult.value
    );
});
const vueFlow = inject(vueFlowKey);
const runQuery = async (code: string) => {
    // 'use' keyword is not allowed
    if (checkUseKeywordExistence(code)) {
        error.value = 'The "USE" keyword is not allowed.';
        return;
    }

    const { error: QueryError, result: QueryResult } =
        await window.api.runQuery(code);

    if (QueryError !== null) {
        error.value = QueryError.message;
        return;
    }

    const LastResult = getLastResultFromQuery(QueryResult);

    const displayResult = (item: { [k: string]: string }) => {
        const Keys = Object.keys(item);

        if (Keys.includes('Database')) {
            tableResults.value = [];
            affectedRows.value = -1;
            selectedRows.value = [];
            hasNoResult.value = false;
            databaseResults.value = LastResult.map(
                (result) => Object.values(result)[0],
            );
            return;
        }

        if (Keys.includes(`Tables_in_${playgroundStore.database}`)) {
            databaseResults.value = [];
            affectedRows.value = -1;
            selectedRows.value = [];
            hasNoResult.value = false;
            tableResults.value = LastResult.map(
                (result) => Object.values(result)[0],
            );
            return;
        }

        if (Keys.includes('fieldCount')) {
            tableResults.value = [];
            databaseResults.value = [];
            selectedRows.value = [];
            affectedRows.value = LastResult.affectedRows;
            hasNoResult.value = false;
            return;
        }

        // Could SELECT keyword or anything that will view the result
        tableResults.value = [];
        databaseResults.value = [];
        affectedRows.value = -1;
        selectedRows.value = LastResult;
        hasNoResult.value = false;
    };

    if (LastResult.length === 0) {
        tableResults.value = [];
        databaseResults.value = [];
        affectedRows.value = -1;
        selectedRows.value = [];
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
};
const onClickCreateTables = async () => {
    if (!vueFlow) return;
    const { nodes, edges } = vueFlow;
    const Script = exportToSQL(nodes.value, edges.value);
    const { error: QueryError } = await window.api.runQuery(Script);

    if (QueryError !== null) {
        error.value = QueryError.message;
    }
};
</script>

<template>
    <div class="mt-4 h-[calc(100%-25px-1rem-1rem)] px-4">
        <div class="mb-2">
            <VUniversalButton class="w-[150px]" @click="onClickCreateTables">
                <template #text>Generate Tables</template>
            </VUniversalButton>
        </div>
        <div v-if="error !== ''" class="mb-2 flex justify-center">
            <VAlert type="danger">
                {{ error }}
            </VAlert>
        </div>
        <div
            class="border-2 border-slate-300 pl-2 dark:border-dark-700"
            :class="{
                'rounded-t-lg': displayBottomView,
                'rounded-lg': !displayBottomView,
            }"
        >
            <TextEditor @run-query="runQuery" />
        </div>
        <div
            v-if="displayBottomView"
            class="border-t-none rounded-b-lg border-b-2 border-l-2 border-r-2 border-slate-300 dark:border-dark-700"
        >
            <PlainResults
                v-if="
                    tableResults.length !== 0 &&
                    databaseResults.length === 0 &&
                    affectedRows === -1 &&
                    selectedRows.length === 0 &&
                    !hasNoResult
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
                    !hasNoResult
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
                    selectedRows.length !== 0
                "
                :columns="selectedRows"
            />
            <FieldCount
                v-if="
                    databaseResults.length === 0 &&
                    tableResults.length === 0 &&
                    affectedRows !== -1 &&
                    selectedRows.length === 0 &&
                    !hasNoResult
                "
            >
                {{ affectedRows }}
            </FieldCount>
            <NoResult
                v-if="
                    databaseResults.length === 0 &&
                    tableResults.length === 0 &&
                    affectedRows === -1 &&
                    selectedRows.length === 0 &&
                    hasNoResult
                "
            />
        </div>
    </div>
</template>
