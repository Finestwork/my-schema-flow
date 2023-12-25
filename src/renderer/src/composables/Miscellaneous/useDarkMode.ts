import { ref } from 'vue';
export function useDarkMode() {
    const isDark = ref(true);
    const toggleDarkMode = () => {
        const body = document.body;
        if (body.classList.contains('dark')) {
            body.classList.remove('dark');
            isDark.value = false;
        } else {
            body.classList.add('dark');
            isDark.value = true;
        }
    };

    return {
        isDark,
        toggleDarkMode,
    };
}
