<script setup lang="ts">
import VPlaygroundButtonIcon from '@components/Base/ButtonIcons/VPlaygroundButtonIcon.vue';
import VAlert from '@components/Base/Alerts/VAlert.vue';
import PlayIcon from '@components/Shared/Icons/PlayIcon.vue';
import BackArrowIconVue from '@components/Shared/Icons/BackArrowIcon.vue';
import CodingEllipsisIcon from '@components/Shared/Icons/CodingEllipsisIcon.vue';
import TextEditor from '@components/Modules/Playground/Partials/MainContentTextEditor.vue';
import Result from '@components/Modules/Playground/Partials/Result/Result.vue';
import { usePlaygroundStore } from '@stores/Playground';
import { dropAllTablesQuery } from '@utilities/MySQLHelper';
import { checkUseKeywordExistence } from '@utilities/Editor/LineValidatorHelper';
import { exportToSQL } from '@utilities/ExportHelper';
import { vueFlowKey } from '@symbols/VueFlow';
import { ref, inject } from 'vue';
import { klona } from 'klona';
import NProgress from 'nprogress';
import type {
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

const clearDatabase = usePlaygroundStore().clearDatabase;

const root = ref<HTMLDivElement>();
const error = ref('');
const code = ref('');
const isGeneratingTable = ref(false);
const isRunningCode = ref(false);
const result = ref<TMySQLConnectionReturn | Record<string, never>>({});
const vueFlow = inject(vueFlowKey);

const runQuery = async () => {
    if (isRunningCode.value || code.value.trim() === '') return;
    isRunningCode.value = true;
    const ProgressBar = NProgress.configure({
        parent: '#playgroundModal',
        showSpinner: false,
    });
    ProgressBar.start();
    error.value = '';

    // 'use' keyword is not allowed
    if (checkUseKeywordExistence(code.value)) {
        error.value = 'The "USE" keyword is not allowed.';
        isRunningCode.value = false;
        ProgressBar.done();
        return;
    }

    result.value = await klona(window.api.runQuery(code.value));
    ProgressBar.done();
    isRunningCode.value = false;
};
const onClickCreateTables = async () => {
    if (!vueFlow || isGeneratingTable.value) return;
    const ProgressBar = NProgress.configure({
        parent: '#playgroundModal',
        showSpinner: false,
    });
    try {
        ProgressBar.start();
        isGeneratingTable.value = true;
        error.value = '';
        const { nodes, edges } = vueFlow;
        let script = 'SET FOREIGN_KEY_CHECKS = 0;\n';
        script += dropAllTablesQuery(nodes.value);
        script += 'SET FOREIGN_KEY_CHECKS = 1;\n';
        script += exportToSQL(nodes.value, edges.value);
        const { error: QueryError } = await window.api.runQuery(script);
        isGeneratingTable.value = false;
        ProgressBar.done();

        if (QueryError !== null) {
            error.value = QueryError.message;
        }
    } catch (e) {
        ProgressBar.done();
    }
};
</script>

<template>
    <div ref="root" class="mt-6 px-4 pb-4">
        <div v-if="error !== ''" class="mb-2 flex justify-center">
            <VAlert type="danger">
                {{ error }}
            </VAlert>
        </div>
        <div class="mb-2">
            <div class="flex justify-between">
                <VPlaygroundButtonIcon @on-click="clearDatabase">
                    <BackArrowIconVue />
                    <template #slot>Back To Database Selection</template>
                </VPlaygroundButtonIcon>
                <div>
                    <VPlaygroundButtonIcon
                        class="mr-2"
                        :disabled="isGeneratingTable"
                        @on-click="onClickCreateTables"
                    >
                        <CodingEllipsisIcon />
                        <template #slot>Generate tables from diagram</template>
                    </VPlaygroundButtonIcon>
                    <VPlaygroundButtonIcon
                        :disabled="isRunningCode"
                        @on-click="runQuery"
                    >
                        <span class="ml-[.1rem] block h-full w-full">
                            <PlayIcon />
                        </span>
                        <template #slot>Run code</template>
                    </VPlaygroundButtonIcon>
                </div>
            </div>
        </div>
        <TextEditor v-model="code" @run-query="runQuery" />
        <Result :result="result" />
    </div>
</template>
