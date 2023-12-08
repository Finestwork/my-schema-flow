import { nodeAutolayout } from '@utilities/NodeHelper';
import { useTableStore } from '@stores/TableStore';
import { useSettingsStore } from '@stores/SettingsStore';

export function useAutoLayout() {
    const TableStore = useTableStore();
    const SettingsStore = useSettingsStore();
    const { nodes, edges } = nodeAutolayout(
        TableStore.elements,
        TableStore.edges,
        SettingsStore.currentNodeOrientation,
    );
    TableStore.elements = nodes;
    TableStore.edges = edges;
}
