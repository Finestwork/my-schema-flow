import { useVueFlow } from '@vue-flow/core';

export function useDeleteNode() {
    const { removeNodes, getNodes } = useVueFlow();

    const deleteNode = () => {
        const Nodes = getNodes.value;
        const Node = Nodes.find((node) => node.id === props.id);
        if (!Node) return;
        removeNodes([Node]);
    };

    return {
        deleteNode,
    };
}
