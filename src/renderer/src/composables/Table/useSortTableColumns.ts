import { sortConstraintKeys } from '@utilities/TableHelper';
import { vueFlowKey } from '@symbols/VueFlow';
import { inject } from 'vue';

export function useSortTableColumns() {
    const VueFlow = inject(vueFlowKey);

    const sortPrimaryKey = () => {
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
        sortPrimaryKey,
    };
}
