import { useSettingsStore } from '@stores/Settings';
import { storeToRefs } from 'pinia';

export function useDarkMode() {
    const settingsStore = useSettingsStore();
    const { isDarkMode } = storeToRefs(settingsStore);
    const toggleDarkMode = () => {
        const body = document.body;
        if (body.classList.contains('dark')) {
            body.classList.remove('dark');
            isDarkMode.value = false;
        } else {
            body.classList.add('dark');
            isDarkMode.value = true;
        }
    };

    return {
        isDarkMode,
        toggleDarkMode,
    };
}
