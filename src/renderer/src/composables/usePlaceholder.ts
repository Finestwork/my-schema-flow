import { useCanvasStore } from '@stores/CanvasStore';
import { useVueFlow } from '@vue-flow/core';
import { nextTick, ref, toValue } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import type { Ref } from 'vue';

export function usePlaceholder(placeholder: Ref<HTMLElement>) {
    const canvasStore = useCanvasStore();
    const draggableContainer = ref();
    const canShow = ref(false);
    const isDragging = ref(false);
    const {
        getNodes,
        vueFlowRef,
        project,
        onPaneReady,
        onPaneMouseMove,
        onPaneMouseEnter,
        onPaneMouseLeave,
        onMove,
        onMoveEnd,
        onPaneClick,
        addNodes,
    } = useVueFlow();

    const _movePlaceholder = async (clientX: number, clientY: number) => {
        await nextTick(); // Since custom placeholder uses v-if, it needs to be rendered first
        const { left, top } = vueFlowRef.value.getBoundingClientRect();
        Object.assign(toValue(placeholder).style, {
            left: `${clientX - left + 5}px`,
            top: `${clientY - top + 5}px`,
        });
    };

    onPaneReady(() => {
        draggableContainer.value = vueFlowRef.value.querySelector(
            '.vue-flow__pane.vue-flow__container.draggable',
        );
    });

    onPaneMouseEnter(() => {
        if (!canvasStore.isCreatingTable) {
            Object.assign(draggableContainer.value.style, {
                cursor: null,
            });
            return;
        }
        Object.assign(draggableContainer.value.style, {
            cursor: 'crosshair',
        });
        canShow.value = true;
    });
    onPaneMouseLeave(() => {
        if (!canvasStore.isCreatingTable) return;
        canShow.value = false;
    });

    onMove(() => {
        if (!canvasStore.isCreatingTable) return;
        if (!isDragging.value) {
            isDragging.value = true;
            canShow.value = false;
            Object.assign(draggableContainer.value.style, {
                cursor: null,
            });
        }
    });

    onMoveEnd((event) => {
        if (!canvasStore.isCreatingTable) return;
        const MouseEv = event.event.sourceEvent;
        const { clientX, clientY } = MouseEv;
        isDragging.value = false;
        canShow.value = true;
        _movePlaceholder(clientX, clientY);
        Object.assign(draggableContainer.value.style, {
            cursor: 'crosshair',
        });
    });

    onPaneMouseMove(({ clientX, clientY }) => {
        if (
            !canvasStore.isCreatingTable ||
            !vueFlowRef.value ||
            !toValue(placeholder)
        )
            return;
        _movePlaceholder(clientX, clientY);
    });

    onPaneClick(async ({ clientX, clientY }) => {
        if (!canvasStore.isCreatingTable) return;
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
                state: {
                    isActive: false,
                },
                style: {
                    opacity: 1,
                },
            },
        };
        addNodes([NewTable]);
        Object.assign(draggableContainer.value.style, {
            cursor: null,
        });
        await nextTick();
        canvasStore.isCreatingTable = false;
        canShow.value = false;
    });

    return {
        canShow,
        isDragging,
    };
}
