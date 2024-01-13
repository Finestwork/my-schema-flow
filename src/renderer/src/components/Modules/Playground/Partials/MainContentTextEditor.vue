<script setup lang="ts">
import { useTrackEditorTheme } from '@composables/TextEditor/useTrackEditorTheme';
import { useSQLLanguage } from '@composables/TextEditor/useSQLLanguage';
import { getEditorOptions } from '@utilities/Editor/TextEditorHelper';
import DarkTheme from '@utilities/Editor/DarkTheme';
import LightTheme from '@utilities/Editor/LightTheme';
import { editor, Range, MarkerSeverity } from 'monaco-editor';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import { setupLanguageFeatures, LanguageIdEnum } from 'monaco-sql-languages';
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
import SQLWorker from 'monaco-sql-languages/out/esm/sql/sql.worker?worker';
import 'monaco-sql-languages/out/esm/sql/sql.contribution';
import 'monaco-sql-languages/out/esm/mysql/mysql.contribution';
import ITextModel = editor.ITextModel;

const emits = defineEmits<{
    (e: 'runQuery');
    (e: 'showTables');
    (e: 'showDatabases');
}>();
const { modelValue } = defineModels<{
    modelValue: string;
}>();
const editorWrapper = ref<HTMLElement>();

let monaco: IStandaloneCodeEditor | null = null;
const onKeydownDisplayResult = async (e: KeyboardEvent) => {
    if (!e.altKey || e.key !== 'Enter') return;
    emits('runQuery');
};

// Without doing this, it throws widget error when just assigning to window's event listener
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
        getWorker(_, label) {
            if (label === 'sql') return new SQLWorker();
            return new EditorWorker();
        },
    };

    setupLanguageFeatures({
        languageId: LanguageIdEnum.SQL,
        completionItems: false,
    });

    monaco = editor.create(
        editorWrapper.value as HTMLElement,
        getEditorOptions(EditorOptions),
    );

    if (monaco == null) return;

    const MonacoModel = monaco.getModel();
    if (MonacoModel !== null) {
        // Prevent user from using 'use' keyword
        MonacoModel.onDidChangeContent(() => {
            if (monaco === null) return;

            const content = monaco.getValue();
            const index = content.indexOf('use');
            const Position = monaco.getPosition();
            if (Position === null) return;

            const id = `use-keyword-${Position.lineNumber}`;
            const LatestMonacoModel = <ITextModel>monaco.getModel();
            if (index !== -1 && MonacoModel !== null) {
                const UseKeywordLength = 3;
                const Position = LatestMonacoModel.getPositionAt(index);
                const range = new Range(
                    Position.lineNumber,
                    Position.column,
                    Position.lineNumber,
                    Position.column + UseKeywordLength,
                );
                const markerData = {
                    severity: MarkerSeverity.Error,
                    message: "Use of 'use' keyword is prohibited.",
                    startLineNumber: range.startLineNumber,
                    startColumn: range.startColumn,
                    endLineNumber: range.endLineNumber,
                    endColumn: range.endColumn,
                };
                editor.setModelMarkers(LatestMonacoModel, id, [markerData]);
            } else {
                editor.removeAllMarkers(id);
            }

            modelValue.value = monaco?.getValue() ?? '';
        });
    }

    window.addEventListener('resize', updateLayout);
});
onUnmounted(() => {
    window.removeEventListener('resize', updateLayout);
});
useTrackEditorTheme();
useSQLLanguage();
</script>

<template>
    <div
        ref="editorWrapper"
        class="relative h-[350px] w-full border-2 border-dashed border-slate-300 dark:border-slate-700"
        @keydown="onKeydownDisplayResult"
    />
</template>
