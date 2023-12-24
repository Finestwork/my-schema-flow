import { useSaveCanvas } from '@composables/Canvas/useSaveCanvas';
import { onUnmounted } from 'vue';

export function useKeyboardShortcuts() {
    const { saveCanvas } = useSaveCanvas();
    const shortcut = (e: KeyboardEvent) => {
        const SaveKey = (e.ctrlKey || e.metaKey) && e.key === 's';

        if (SaveKey) {
            saveCanvas();
        }
    };

    window.addEventListener('keydown', shortcut);

    onUnmounted(() => {
        window.removeEventListener('keydown', shortcut);
    });
}
