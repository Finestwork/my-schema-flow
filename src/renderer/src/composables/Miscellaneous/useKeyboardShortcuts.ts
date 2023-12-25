import { useSaveCanvas } from '@composables/Canvas/useSaveCanvas';
import { useHistoryActions } from '@composables/History/useHistoryActions';
import { onUnmounted } from 'vue';

export function useKeyboardShortcuts() {
    const { saveCanvas } = useSaveCanvas();
    const { redoHistory, undoHistory } = useHistoryActions();

    const shortcut = (e: KeyboardEvent) => {
        const SaveKey = (e.ctrlKey || e.metaKey) && e.key === 's';
        const RedoKey = (e.ctrlKey || e.metaKey) && e.key === 'y';
        const UndoKey = (e.ctrlKey || e.metaKey) && e.key === 'z';

        if (SaveKey) {
            saveCanvas();
        } else if (RedoKey) {
            redoHistory();
        } else if (UndoKey) {
            undoHistory();
        }
    };

    window.addEventListener('keydown', shortcut);

    onUnmounted(() => {
        window.removeEventListener('keydown', shortcut);
    });
}
