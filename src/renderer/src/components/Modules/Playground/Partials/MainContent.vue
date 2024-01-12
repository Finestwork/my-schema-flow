<script setup lang="ts">
import VUniversalButton from '@components/Base/Buttons/VUniversalButton.vue';
import VAlert from '@components/Base/Alerts/VAlert.vue';
import TextEditor from '@components/Modules/Playground/Partials/MainContentTextEditor.vue';
import Result from '@components/Modules/Playground/Partials/Result/Result.vue';
import { checkUseKeywordExistence } from '@utilities/Editor/LineValidatorHelper';
import { exportToSQL } from '@utilities/ExportHelper';
import { vueFlowKey } from '@symbols/VueFlow';
import { ref, inject } from 'vue';
import { klona } from 'klona';
import { TMySQLConnectionReturn } from '../../../../../../preload/index';

const error = ref('');
const result = ref<TMySQLConnectionReturn | Record<string, never>>({});
const vueFlow = inject(vueFlowKey);
const runQuery = async (code: string) => {
    error.value = '';

    // 'use' keyword is not allowed
    if (checkUseKeywordExistence(code)) {
        error.value = 'The "USE" keyword is not allowed.';
        return;
    }

    result.value = await klona(window.api.runQuery(code));
};
const onClickCreateTables = async () => {
    if (!vueFlow) return;
    error.value = '';
    const { nodes, edges } = vueFlow;
    const Script = exportToSQL(nodes.value, edges.value);
    const { error: QueryError } = await window.api.runQuery(Script);

    if (QueryError !== null) {
        error.value = QueryError.message;
    }
};
</script>

<template>
    <div class="mt-4 px-4 pb-4">
        <div class="mb-2">
            <VUniversalButton
                class="max-w-[150px]"
                @click="onClickCreateTables"
            >
                <template #text>Generate Tables</template>
            </VUniversalButton>
        </div>
        <div v-if="error !== ''" class="mb-2 flex justify-center">
            <VAlert type="danger">
                {{ error }}
            </VAlert>
        </div>
        <TextEditor @run-query="runQuery" />
        <Result :result="result" />
    </div>
</template>
