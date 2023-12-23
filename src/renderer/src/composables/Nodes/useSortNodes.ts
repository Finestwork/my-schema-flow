import { sortConstraintKeys } from '@utilities/TableHelper';
import { vueFlowKey } from '@symbols/VueFlow';
import { inject } from 'vue';

export function useSortNodes() {
    const VueFlow = inject(vueFlowKey);

    const sortNodeColumns = () => {
        if (!VueFlow) return;
        VueFlow.setNodes((nodes) => {
            return nodes.map((node) => {
                node.data.table.columns = sortConstraintKeys(
                    node.data.table.columns,
                );
                return node;
            });
        });
    };

    return {
        sortNodeColumns,
    };
}
