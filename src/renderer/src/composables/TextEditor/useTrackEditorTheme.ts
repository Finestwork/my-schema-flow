import { useSettingsStore } from '@stores/Settings';
import { watch } from 'vue';
import { editor } from 'monaco-editor';

export function useTrackEditorTheme() {
    const settingsStore = useSettingsStore();
    editor.setTheme(settingsStore.isDarkMode ? 'dark' : 'light');

    watch(
        () => settingsStore.isDarkMode,
        (isDarkMode) => {
            if (isDarkMode) editor.setTheme('dark');
            else editor.setTheme('light');
        },
    );
}
