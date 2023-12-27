import { useSaveCanvas } from '@composables/Canvas/useSaveCanvas';
import { useHistoryActions } from '@composables/History/useHistoryActions';
import { useCreateNode } from '@composables/Nodes/useCreateNode';
import { useDarkMode } from '@composables/Miscellaneous/useDarkMode';
import { onUnmounted } from 'vue';
import { useVueFlow } from '@vue-flow/core';

export function useKeyboardShortcuts() {
    const { saveCanvas } = useSaveCanvas();
    const { redoHistory, undoHistory } = useHistoryActions();
    const { createNode } = useCreateNode();
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const { vueFlowRef } = useVueFlow();

    const shortcut = (e: KeyboardEvent) => {
        const SaveKey = (e.ctrlKey || e.metaKey) && e.key === 's';
        const RedoKey = (e.ctrlKey || e.metaKey) && e.key === 'y';
        const UndoKey = (e.ctrlKey || e.metaKey) && e.key === 'z';
        const ToggleDarkModeKey =
            (e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'M';
        const OpenFileKey = (e.ctrlKey || e.metaKey) && e.key === 'o';
        const CreateTableKey =
            (e.ctrlKey || e.metaKey) &&
            e.key.toLowerCase() === 'c' &&
            e.shiftKey;

        if (SaveKey) {
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
        }
    };

    window.addEventListener('keydown', shortcut);

    onUnmounted(() => {
        window.removeEventListener('keydown', shortcut);
    });
}
