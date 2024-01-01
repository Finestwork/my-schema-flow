import { useCanvasStore } from '@stores/Canvas';
import { vueFlowKey } from '@symbols/VueFlow';
import { inject } from 'vue';
import { klona } from 'klona/full';
import { v4 as uuidv4 } from 'uuid';

export function useTableNodeCopy() {
    const canvasStore = useCanvasStore();
    const VueFlow = inject(vueFlowKey);

    const copyTable = () => {
        if (!VueFlow || VueFlow.vueFlowRef.value === null) return;
        const TableData = klona(canvasStore.currentActiveNode.data.table);
        const TableName = `${TableData.name}_${VueFlow.getNodes.value.length}`;
        const PositionX = canvasStore.currentActiveNode.position.x;
        const PositionY = canvasStore.currentActiveNode.position.y;
        const Width = canvasStore.currentActiveNode.dimensions.width;
        const NewTable = {
            id: uuidv4(),
            type: 'custom',
            connectable: false,
            position: { x: PositionX + Width + 40, y: PositionY },
            data: {
                table: {
                    name: TableName,
                    columns: TableData.columns,
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
    };

    return {
        copyTable,
    };
}
