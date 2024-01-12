<script setup lang="ts">
import { useTrackEditorTheme } from '@composables/TextEditor/useTrackEditorTheme';
import { useSQLLanguage } from '@composables/TextEditor/useSQLLanguage';
import { getEditorOptions } from '@utilities/Editor/TextEditorHelper';
import DarkTheme from '@utilities/Editor/DarkTheme';
import LightTheme from '@utilities/Editor/LightTheme';
import { editor, Range, MarkerSeverity } from 'monaco-editor';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

const emits = defineEmits<{
    (e: 'runQuery', value: string);
    (e: 'showTables');
    (e: 'showDatabases');
}>();
const editorWrapper = ref<HTMLDivElement>();

let monaco: IStandaloneCodeEditor | null = null;
const onKeydownDisplayResult = async (e: KeyboardEvent) => {
    if (!e.altKey || e.key !== 'Enter') return;
    emits('runQuery', monaco.getValue());
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
        getWorker() {
            return new EditorWorker();
        },
    };

    monaco = editor.create(
        editorWrapper.value,
        getEditorOptions(EditorOptions),
    );

    // Prevent user from using 'use' keyword
    const MonacoModel = monaco.getModel();
    MonacoModel.onDidChangeContent(() => {
        const content = monaco.getValue();
        const index = content.indexOf('use');
        const { lineNumber } = monaco.getPosition();
        const id = `use-keyword-${lineNumber}`;
        if (index !== -1) {
            const UseKeywordLength = 3;
            const Position = MonacoModel.getPositionAt(index);
            const range = new Range(
                lineNumber,
                Position.column,
                lineNumber,
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
            editor.setModelMarkers(monaco.getModel(), id, [markerData]);
        } else {
            editor.removeAllMarkers(id);
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
    <div
        ref="editorWrapper"
        class="relative h-[350px] w-full"
        @keydown="onKeydownDisplayResult"
    />
</template>