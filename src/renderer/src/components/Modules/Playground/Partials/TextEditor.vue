<script setup lang="ts">
import VAlert from '@components/Base/Alerts/VAlert.vue';
import { useTrackEditorTheme } from '@composables/TextEditor/useTrackEditorTheme';
import { useSQLLanguage } from '@composables/TextEditor/useSQLLanguage';
import { getEditorOptions } from '@utilities/Editor/TextEditorHelper';
import DarkTheme from '@utilities/Editor/DarkTheme';
import LightTheme from '@utilities/Editor/LightTheme';
import { checkUseKeywordExistence } from '@utilities/Editor/LineValidatorHelper';
import { editor, Range, MarkerSeverity } from 'monaco-editor';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

const editorWrapper = ref<HTMLDivElement>();
const error = ref('');
let monaco: IStandaloneCodeEditor | null = null;
const onKeydownDisplayResult = async (e: KeyboardEvent) => {
    if (!e.altKey || e.key !== 'Enter') return;
    const currentValue = monaco.getValue();

    // 'use' keyword is not allowed
    if (checkUseKeywordExistence(currentValue)) {
        error.value = 'The "USE" keyword is not allowed.';
        return;
    }

    const QueryResult = await window.api.runQuery(currentValue);
    const Results = QueryResult[0]; // Desired results are always at 0 because index 1 is a buffer array
    const LastResult = Results[Results.length - 1];

    // If the last result is array of arrays, then mysql executed too many statements
    if (Array.isArray(LastResult)) {
        const LastResult = Results[Results.length - 1]; // There might be so many results that we only want the last one
        console.log(LastResult);
        return;
    }

    // The user probably executed only one statement, hence, returned array of objects
    console.log(Object.keys(LastResult), LastResult);
};

// Without doing this, it throws widget error
const updateLayout = () => {
    monaco?.layout();
};

onMounted(async () => {
    await nextTick();
    const EditorOptions = {
        language: 'sql',
    };
    editor.defineTheme('dark', DarkTheme);
    editor.defineTheme('light', LightTheme);

    self.MonacoEnvironment = {
        getWorker() {
            return new EditorWorker();
        },
    };

    monaco = editor.create(
        editorWrapper.value,
        getEditorOptions(EditorOptions),
    );

    // Prevent user from using use keyword
    const MonacoModel = monaco.getModel();
    MonacoModel.onDidChangeContent(() => {
        const content = monaco.getValue();
        const index = content.indexOf('use');
        if (index !== -1) {
            const position = MonacoModel.getPositionAt(index);
            const range = new Range(
                position.lineNumber,
                position.column,
                position.lineNumber,
                position.column + 3,
            );
            const id = `use-keyword-${position.lineNumber}-${position.column}`;
            const markerData = {
                severity: MarkerSeverity.Error,
                message: "Use of 'use' keyword is prohibited.",
                startLineNumber: range.startLineNumber,
                startColumn: range.startColumn,
                endLineNumber: range.endLineNumber,
                endColumn: range.endColumn,
            };
            editor.setModelMarkers(monaco.getModel(), id, [markerData]);
        }
    });

    window.addEventListener('resize', updateLayout);
});
onUnmounted(() => {
    window.removeEventListener('resize', updateLayout);
});
useTrackEditorTheme();
useSQLLanguage();
</script>

<template>
    <div class="h-full w-full">
        <div v-if="error !== ''" class="mb-2 flex justify-center">
            <VAlert type="danger">
                {{ error }}
            </VAlert>
        </div>
        <div
            ref="editorWrapper"
            class="h-full max-h-[350px] w-full"
            @keydown="onKeydownDisplayResult"
        />
    </div>
</template>
