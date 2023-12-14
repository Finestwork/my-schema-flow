import { useVueFlow } from '@vue-flow/core';

export function useNodeDragEvent() {
    const { onNodeDragStop, onNodeDragStart } = useVueFlow();
    let position = {
        x: -1,
        y: -1,
    };

    onNodeDragStart((event) => {
        position = event.node.position;
    });

    onNodeDragStop((event) => {
        const Node = event.node;
        const positionChanged =
            position.x !== Node.position.x && position.y !== Node.position.y;
        if (!positionChanged) return;
        Node.data.state.isActive = true;
        console.log(Node.data);
    });

    return {
        position,
    };
}
