import { useSettingsStore } from '@stores/SettingsStore';

export function useIPCListeners() {
    const SettingsStore = useSettingsStore();

    const onFileSave = () => {
        window.electron.ipcRenderer.on(
            'fileSavedSuccessfully',
            (_, filePath: string, filename: string) => {
                SettingsStore.file.path = filePath;
                SettingsStore.file.name = filename;
            },
        );
    };

    return {
        onFileSave,
    };
}
