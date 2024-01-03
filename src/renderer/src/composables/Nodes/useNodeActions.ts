import { useCanvasStore } from '@stores/Canvas';
import { useHistoryActions } from '@composables/History/useHistoryActions';
import { vueFlowKey } from '@symbols/VueFlow';
import { inject } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { klona } from 'klona/full';
import { createNodes } from '@utilities/NodeEdgeHelper';

export function useNodeActions() {
    const canvasStore = useCanvasStore();
    const { createHistory } = useHistoryActions();
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

    const deleteNode = () => {
        if (!VueFlow) return;
        const Nodes = VueFlow.getNodes.value;
        const Node = Nodes.find(
            (node) => node.id === canvasStore.currentActiveNode.id,
        );
        if (!Node) return;
        VueFlow.removeNodes([Node]);
        createHistory(`Deleted Table: ${Node.data.table.name}`);
    };

    const copyNode = () => {
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
        createHistory(`Cloned Table: ${TableName}`);
    };

    const createNodeFromImport = (nodes: object) => {
        if (!VueFlow || VueFlow.vueFlowRef.value === null) return;
        const NewTable = createNodes(nodes);
        VueFlow.setNodes(NewTable);
        createHistory(`Opened Database File`);
    };

    return {
        createNode,
        deleteNode,
        copyNode,
        createNodeFromImport,
    };
}
