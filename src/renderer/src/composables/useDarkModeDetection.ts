import { useSettingsStore } from '@stores/SettingsStore';
import { onMounted } from 'vue';

export const isDarkMode = () => {
    const SettingsStore = useSettingsStore();
    onMounted(() => {
        if (SettingsStore.isDarkMode) {
            document.documentElement.classList.add('dark');
        }
    });
};
