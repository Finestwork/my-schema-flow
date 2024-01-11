import { extractTableData } from '@utilities/TableHelper';
import { vueFlowKey } from '@symbols/VueFlow';
import * as monaco from 'monaco-editor';
import { inject } from 'vue';
import type { editor, Position } from 'monaco-editor';

export function useSqlAutoComplete() {
    const vueFlow = inject(vueFlowKey);
    const { tables: Tables, columns: Columns } = extractTableData(
        vueFlow?.getNodes.value ?? [],
    );

    const getSqlAutoComplete = (
        model: editor.ITextModel,
        position: Position,
    ) => {
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
    };

    return {
        getSqlAutoComplete,
    };
}
