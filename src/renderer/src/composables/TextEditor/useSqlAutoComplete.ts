import { extractTableData } from '@utilities/TableHelper';
import { vueFlowKey } from '@symbols/VueFlow';
import SQLKeywords from '@autocomplete/SQLAutocomplete';
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
        const Keywords = SQLKeywords.map((keyword) => {
            return {
                label: keyword,
                detail: 'keyword',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: keyword,
                range: {
                    startLineNumber: position.lineNumber,
                    endLineNumber: position.lineNumber,
                    startColumn: word.startColumn,
                    endColumn: word.endColumn,
                },
            };
        });

        const MappedTable =
            Tables.map((table) => {
                return {
                    label: table,
                    detail: 'Table',
                    kind: monaco.languages.CompletionItemKind.Field,
                    insertText: `${table}`,
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
                label: column.name,
                detail: column.type,
                kind: monaco.languages.CompletionItemKind.Field,
                insertText: `${column.name}`,
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
