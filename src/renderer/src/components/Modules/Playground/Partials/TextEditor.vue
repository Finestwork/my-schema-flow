<script setup lang="ts">
import { extractTableData } from '@utilities/TableHelper';
import { vueFlowKey } from '@symbols/VueFlow';
import MaterialOcean from '@utilities/Editor/Theme';
import * as monaco from 'monaco-editor';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import { nextTick, onMounted, ref, inject, onUnmounted } from 'vue';
import { editor } from 'monaco-editor';
import IStandaloneEditorConstructionOptions = editor.IStandaloneEditorConstructionOptions;

const editorWrapper = ref();
const vueFlow = inject(vueFlowKey);
let monacoEditorInstance = null;
let monacoEditorDisposable = null;
const onKeydownDisplayResult = async (e: KeyboardEvent) => {
    if (!e.altKey || e.key !== 'Enter') return;
    const Result = await window.api.runQuery(monacoEditorInstance.getValue());

    console.log(Result);
};

onMounted(async () => {
    await nextTick();
    const { tables: Tables, columns: Columns } = extractTableData(
        vueFlow?.getNodes.value ?? [],
    );

    const EditorOptions: IStandaloneEditorConstructionOptions = {
        value: '',
        language: 'sql',
        theme: 'ocean',
        fontSize: 14,
        fontFamily: 'NeonMono',
        lineHeight: 35,
        fontWeight: '700',
        cursorSmoothCaretAnimation: 'on',
        cursorBlinking: 'expand',
        tabSize: 2,
        fontLigatures:
            "'ss01', 'ss02', 'ss03', 'ss04', 'ss05', 'ss06', 'ss07', 'ss08', 'calt', 'dlig'",
        minimap: {
            enabled: false,
        },
        scrollBeyondLastLine: false,
        lineNumbers: 'on',
        lineDecorationsWidth: 0,
        lineNumbersMinChars: 2,
    };
    editor.defineTheme('ocean', MaterialOcean);

    self.MonacoEnvironment = {
        getWorker() {
            return new EditorWorker();
        },
    };

    // Register SQL language configuration
    monaco.languages.register({ id: 'sql' });

    // Register a completion item provider for SQL language
    monacoEditorDisposable = monaco.languages.registerCompletionItemProvider(
        'sql',
        {
            provideCompletionItems: function (model, position) {
                const word = model.getWordUntilPosition(position);
                const Keywords = [
                    {
                        label: 'SELECT',
                        detail: 'keyword',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'SELECT ',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: word.startColumn,
                            endColumn: word.endColumn,
                        },
                    },
                    {
                        label: 'FROM',
                        detail: 'keyword',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'FROM ',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: word.startColumn,
                            endColumn: word.endColumn,
                        },
                    },
                ];

                const MappedTable =
                    Tables.map((table) => {
                        return {
                            label: table,
                            detail: 'Table',
                            kind: monaco.languages.CompletionItemKind.Field,
                            insertText: `${table} `,
                            range: {
                                startLineNumber: position.lineNumber,
                                endLineNumber: position.lineNumber,
                                startColumn: word.startColumn,
                                endColumn: word.endColumn,
                            },
                        };
                    }) ?? [];

                const MappedColumn = Columns.map((column) => {
                    return {
                        label: column,
                        detail: 'Column',
                        kind: monaco.languages.CompletionItemKind.Field,
                        insertText: `${column} `,
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: word.startColumn,
                            endColumn: word.endColumn,
                        },
                    };
                });

                return {
                    suggestions: [...Keywords, ...MappedTable, ...MappedColumn],
                };
            },
        },
    );
    monacoEditorInstance = monaco.editor.create(
        editorWrapper.value,
        EditorOptions,
    );

    window.addEventListener('resize', monacoEditorInstance.layout);
});

onUnmounted(() => {
    monacoEditorDisposable.dispose();
    window.removeEventListener('resize', monacoEditorInstance.layout);
});
</script>

<template>
    <div
        ref="editorWrapper"
        class="h-full max-h-[350px] w-full"
        @keydown="onKeydownDisplayResult"
    />
</template>
