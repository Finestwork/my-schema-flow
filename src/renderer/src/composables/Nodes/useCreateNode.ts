import { useHistory } from '@composables/Miscellaneous/useHistory';
import { vueFlowKey } from '@symbols/VueFlow';
import { inject } from 'vue';
import { v4 as uuidv4 } from 'uuid';

export function useCreateNode() {
    const { createHistory } = useHistory();
    const { getNodes, project, addNodes, vueFlowRef } = inject(vueFlowKey);
    const createNode = (clientX: number, clientY: number) => {
        const { left, top } = vueFlowRef.value.getBoundingClientRect();
        const Position = project({
            x: clientX - left,
            y: clientY - top,
        });
        const TableName = `table_${getNodes.value.length}`;
        const NewTable = {
            id: uuidv4(),
            type: 'custom',
            connectable: false,
            position: { x: Position.x, y: Position.y },
            data: {
                table: {
                    name: TableName,
                    columns: [],
                },
                states: {
                    isActive: false,
                    isFaded: false,
                },
                style: {
                    opacity: 1,
                },
            },
        };
        addNodes([NewTable]);
        createHistory(`Table Created: ${TableName}`);
    };

    return {
        createNode,
    };
}
