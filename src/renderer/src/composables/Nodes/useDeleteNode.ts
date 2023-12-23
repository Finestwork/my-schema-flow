import { vueFlowKey } from '@symbols/VueFlow';
import { inject } from 'vue';

export function useDeleteNode() {
    const VueFlow = inject(vueFlowKey);

    const deleteNode = (nodeId: string) => {
        if (!VueFlow) return;
        const Nodes = VueFlow.getNodes.value;
        const Node = Nodes.find((node) => node.id === nodeId);
        if (!Node) return;
        VueFlow.removeNodes([Node]);
    };

    return {
        deleteNode,
    };
}
