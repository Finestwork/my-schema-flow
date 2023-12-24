import { useHistory } from '@composables/Miscellaneous/useHistory';
import { vueFlowKey } from '@symbols/VueFlow';
import { inject } from 'vue';
import { v4 as uuidv4 } from 'uuid';

export function useCreateNode() {
    const { createHistory } = useHistory();
    const VueFlow = inject(vueFlowKey);
    const createNode = (clientX: number, clientY: number) => {
        if (!VueFlow) return;
        if (VueFlow.vueFlowRef.value === null) return;

        const { left, top } = VueFlow.vueFlowRef.value.getBoundingClientRect();
        const Position = VueFlow.project({
            x: clientX - left,
            y: clientY - top,
        });
        const TableName = `table_${VueFlow.getNodes.value.length}`;
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
        VueFlow.addNodes([NewTable]);
        createHistory(`New Table: ${TableName}`);
    };

    return {
        createNode,
    };
}
