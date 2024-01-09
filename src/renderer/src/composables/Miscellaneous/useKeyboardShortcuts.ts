import { useSettingsStore } from '@stores/Settings';
import { useSaveCanvas } from '@composables/Canvas/useSaveCanvas';
import { useHistoryActions } from '@composables/History/useHistoryActions';
import { useNodeActions } from '@composables/Nodes/useNodeActions';
import { useDarkMode } from '@composables/Miscellaneous/useDarkMode';
import { onMounted, onUnmounted } from 'vue';
import { useVueFlow } from '@vue-flow/core';

export function useKeyboardShortcuts() {
    const settingsStore = useSettingsStore();
    const { saveCanvas } = useSaveCanvas();
    const { redoHistory, undoHistory } = useHistoryActions();
    const { createNode } = useNodeActions();
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const { vueFlowRef } = useVueFlow();

    const shortcut = (e: KeyboardEvent) => {
        const SaveKey = (e.ctrlKey || e.metaKey) && e.key === 's';
        const ShowSettingsKey =
            (e.ctrlKey || e.metaKey) && e.altKey && e.key === 's';
        const RedoKey = (e.ctrlKey || e.metaKey) && e.key === 'y';
        const UndoKey = (e.ctrlKey || e.metaKey) && e.key === 'z';
        const ToggleDarkModeKey =
            (e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'M';
        const OpenFileKey = (e.ctrlKey || e.metaKey) && e.key === 'o';
        const CreateTableKey =
            (e.ctrlKey || e.metaKey) &&
            e.key.toLowerCase() === 'c' &&
            e.shiftKey;

        if (SaveKey && !ShowSettingsKey) {
            saveCanvas();
        } else if (RedoKey) {
            redoHistory();
        } else if (UndoKey) {
            undoHistory();
        } else if (CreateTableKey) {
            if (!vueFlowRef.value) return;
            const { left, top } = vueFlowRef.value.getBoundingClientRect();
            createNode(left + 50, top + 50);
        } else if (ToggleDarkModeKey) {
            toggleDarkMode();
            window.api.toggleDarkMode(isDarkMode.value);
        } else if (OpenFileKey) {
            window.electron.ipcRenderer.send('openFile');
        } else if (ShowSettingsKey) {
            settingsStore.showSettings = true;
        }
    };
    window.addEventListener('keydown', shortcut);

    onUnmounted(() => {
        window.removeEventListener('keydown', shortcut);
    });
}
