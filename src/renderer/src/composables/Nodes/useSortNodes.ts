import { sortConstraintKeys } from '@utilities/TableHelper';
import { vueFlowKey } from '@symbols/VueFlow';
import { inject } from 'vue';

export function useSortNodes() {
    const { setNodes } = inject(vueFlowKey);

    const sortNodeColumns = () => {
        setNodes((nodes) => {
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
