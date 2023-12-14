export function useDarkMode() {
    const toggleDarkMode = () => {
        const Body = document.body;
        if (Body.classList.contains('dark')) {
            Body.classList.remove('dark');
        } else {
            Body.classList.add('dark');
        }
    };

    return {
        toggleDarkMode,
    };
}
