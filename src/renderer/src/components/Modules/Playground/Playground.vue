<script setup lang="ts">
import VFullScreenModal from '@components/Base/Modals/VFullScreenModal.vue';
import VAlert from '@components/Base/Alerts/VAlert.vue';
import TextEditor from '@components/Modules/Playground/Partials/TextEditor.vue';
import TestConnection from '@components/Modules/Playground/Partials/TestConnection.vue';
import PlainResults from '@components/Modules/Playground/Partials/PlainResults.vue';
import { useModalStore } from '@stores/Modal';
import { usePlaygroundStore } from '@stores/Playground';
import { checkUseKeywordExistence } from '@utilities/Editor/LineValidatorHelper';
import { computed, ref } from 'vue';
import { getLastResultFromQuery } from '@utilities/MySQLHelper';

const modalStore = useModalStore();
const playgroundStore = usePlaygroundStore();
const error = ref('');
const databaseResults = ref<Array<string>>([]);
const tableResults = ref<Array<string>>([]);
const displayBottomView = computed(() => {
    return (
        tableResults.value.length !== 0 || databaseResults.value.length !== 0
    );
});

const closeModal = () => {
    modalStore.showPlaygroundModal = false;
};
const runQuery = async (code: string) => {
    // 'use' keyword is not allowed
    if (checkUseKeywordExistence(code)) {
        error.value = 'The "USE" keyword is not allowed.';
        return;
    }

    const QueryResult = await window.api.runQuery(code);
    const LastResult = getLastResultFromQuery(QueryResult);

    const displayResult = (item: { [k: string]: string }) => {
        const Keys = Object.keys(item);

        if (Keys.includes('Database')) {
            tableResults.value = [];
            databaseResults.value = LastResult.map(
                (result) => Object.values(result)[0],
            );
            return;
        }

        if (Keys.includes(`Tables_in_${playgroundStore.database}`)) {
            databaseResults.value = [];
            tableResults.value = LastResult.map(
                (result) => Object.values(result)[0],
            );
            return;
        }

        if (Keys.includes('fieldCount')) {
            console.log(
                'Show status about the query like: Query sent okay or number of rows affected',
                LastResult,
            );
        }

        console.log('SELECT', LastResult);
    };

    if (LastResult.length === 0) {
        console.log('No Result Here');
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
</script>

<template>
    <Teleport to="body">
        <VFullScreenModal @close-modal="closeModal">
            <div class="mt-10 pb-4">
                <div
                    v-if="playgroundStore.connection !== null"
                    class="h-full px-4"
                >
                    <div v-if="error !== ''" class="mb-2 flex justify-center">
                        <VAlert type="danger">
                            {{ error }}
                        </VAlert>
                    </div>
                    <div
                        class="overflow-hidden border-2 border-slate-300 pl-2 dark:border-dark-700"
                        :class="{
                            'rounded-t-lg': displayBottomView,
                            'rounded-lg': !displayBottomView,
                        }"
                    >
                        <TextEditor @run-query="runQuery" />
                    </div>

                    <div
                        v-if="displayBottomView"
                        class="border-t-none overflow-hidden rounded-b-lg border-b-2 border-l-2 border-r-2 border-slate-300 dark:border-dark-700"
                    >
                        <PlainResults
                            v-if="
                                tableResults.length !== 0 &&
                                databaseResults.length === 0
                            "
                            :items="tableResults"
                        >
                            <template #header>Tables</template>
                        </PlainResults>
                        <PlainResults
                            v-if="
                                databaseResults.length !== 0 &&
                                tableResults.length === 0
                            "
                            :items="databaseResults"
                        >
                            <template #header>Database</template>
                        </PlainResults>
                    </div>
                </div>
                <TestConnection v-else />
            </div>
        </VFullScreenModal>
    </Teleport>
</template>
