import { useSettingsStore } from '@stores/SettingsStore';
import { useTableStore } from '@stores/TableStore';

export function useIPCListeners() {
    const SettingsStore = useSettingsStore();
    const TableStore = useTableStore();

    const onFileSave = () => {
        window.electron.ipcRenderer.on(
            'fileSavedSuccessfully',
            (_, filePath: string, filename: string) => {
                SettingsStore.file.path = filePath;
                SettingsStore.file.name = filename;
            },
        );
    };
    const onFileOpened = () => {
        window.electron.ipcRenderer.on(
            'filedOpened',
            (_, contents: string, filePath: string, filename: string) => {
                const Contents = JSON.parse(contents);
                TableStore.elements = Contents.elements;
                TableStore.edges = Contents.edges;
                SettingsStore.file.path = filePath;
                SettingsStore.file.name = filename;
            },
        );
    };

    return {
        onFileSave,
        onFileOpened,
    };
}
