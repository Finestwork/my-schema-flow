import { sortConstraintKeys } from '@utilities/TableHelper';
import { useVueFlow } from '@vue-flow/core';

export function useSortTableColumn() {
    const { setNodes, onPaneReady } = useVueFlow();

    onPaneReady(() => {
        setNodes((nodes) => {
            return nodes.map((node) => {
                node.data.table.columns = sortConstraintKeys(
                    node.data.table.columns,
                );
                return node;
            });
        });
    });
}
