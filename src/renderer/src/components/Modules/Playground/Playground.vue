<script setup lang="ts">
import VFullScreenModal from '@components/Base/Modals/VFullScreenModal.vue';
import VAlert from '@components/Base/Alerts/VAlert.vue';
import TextEditor from '@components/Modules/Playground/Partials/TextEditor.vue';
import TestConnection from '@components/Modules/Playground/Partials/TestConnection.vue';
import PlainResults from '@components/Modules/Playground/Partials/PlainResults.vue';
import { useModalStore } from '@stores/Modal';
import { usePlaygroundStore } from '@stores/Playground';
import { checkUseKeywordExistence } from '@utilities/Editor/LineValidatorHelper';
import { ref } from 'vue';
import { getLastResultFromQuery } from '@utilities/MySQLHelper';

const modalStore = useModalStore();
const playgroundStore = usePlaygroundStore();
const error = ref('');
const plainResults = ref<Array<string>>([]);
const CurrentTestTable = 'test';

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
        switch (Object.keys(item)[0]) {
            case 'Database':
            case `Tables_in_${CurrentTestTable}`:
                plainResults.value = LastResult.map(
                    (result) => Object.values(result)[0],
                );
                break;
            case 'fieldCount':
                console.log(
                    'Show status about the query like: Query sent okay or number of rows affected',
                    LastResult,
                );
                break;
            default:
                console.log('No Result');
        }
    };

    // If the last result is array of arrays, then mysql executed too many statements
    if (Array.isArray(LastResult)) {
        if (LastResult.length === 0) {
            console.log('No Result Here');
            return;
        }
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
                    <TextEditor
                        class="overflow-hidden rounded-t-2xl border-2 border-dashed border-slate-300 dark:border-dark-700"
                        @run-query="runQuery"
                    />
                    <div
                        class="border-t-none overflow-hidden rounded-b-2xl border-b-2 border-l-2 border-r-2 border-dashed border-slate-300 dark:border-dark-700"
                    >
                        <PlainResults
                            v-if="plainResults.length !== 0"
                            :items="plainResults"
                        />
                    </div>
                </div>
                <TestConnection v-else />
            </div>
        </VFullScreenModal>
    </Teleport>
</template>
