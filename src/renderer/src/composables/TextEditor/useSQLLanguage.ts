import { useSqlAutoComplete } from '@composables/TextEditor/useSqlAutoComplete';
import { type IDisposable, languages } from 'monaco-editor';
import { onUnmounted } from 'vue';

export function useSQLLanguage() {
    let autocompleteDisposable: IDisposable | null = null;
    const { getSqlAutoComplete } = useSqlAutoComplete();

    languages.register({ id: 'sql' });

    // Register a completion item provider for SQL language
    autocompleteDisposable = languages.registerCompletionItemProvider('sql', {
        provideCompletionItems: getSqlAutoComplete,
    });

    onUnmounted(() => {
        autocompleteDisposable?.dispose();
    });
}
