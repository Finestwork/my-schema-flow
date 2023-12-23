import { useCreateNode } from '@composables/Nodes/useCreateNode';
import { isCreatingTableKey } from '@symbols/Canvas';
import { vueFlowKey } from '@symbols/VueFlow';
import { nextTick, ref, toValue, inject } from 'vue';
import type { Ref } from 'vue';

export function usePlaceholder(placeholder: Ref<HTMLElement>) {
    const draggableContainer = ref();
    const canShow = ref(false);
    const isDragging = ref(false);
    const isCreatingTable = inject(isCreatingTableKey);
    const VueFlow = inject(vueFlowKey);
    const { createNode } = useCreateNode();

    if (!VueFlow) {
        return {
            canShow,
            isDragging,
        };
    }

    const {
        vueFlowRef,
        onPaneReady,
        onPaneMouseMove,
        onPaneMouseEnter,
        onPaneMouseLeave,
        onMove,
        onMoveEnd,
        onPaneClick,
    } = VueFlow;

    const _movePlaceholder = async (clientX: number, clientY: number) => {
        if (!vueFlowRef.value) return;
        await nextTick(); // Since custom placeholder uses v-if, it needs to be rendered first
        const { left, top } = vueFlowRef.value.getBoundingClientRect();
        Object.assign(toValue(placeholder).style, {
            left: `${clientX - left + 5}px`,
            top: `${clientY - top + 5}px`,
        });
    };

    onPaneReady(() => {
        if (!vueFlowRef.value) return;
        draggableContainer.value = vueFlowRef.value.querySelector(
            '.vue-flow__pane.vue-flow__container.draggable',
        );
    });

    onPaneMouseEnter(() => {
        if (isCreatingTable && !isCreatingTable.value) {
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
        if (isCreatingTable && !isCreatingTable.value) return;
        canShow.value = false;
    });

    onMove(() => {
        if (isCreatingTable && !isCreatingTable.value) return;
        if (!isDragging.value) {
            isDragging.value = true;
            canShow.value = false;
            Object.assign(draggableContainer.value.style, {
                cursor: null,
            });
        }
    });

    onMoveEnd((event) => {
        if (isCreatingTable && !isCreatingTable.value) return;
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
            (isCreatingTable && !isCreatingTable.value) ||
            !vueFlowRef.value ||
            !toValue(placeholder)
        )
            return;
        _movePlaceholder(clientX, clientY);
    });

    onPaneClick(async ({ clientX, clientY }) => {
        if (!isCreatingTable || (isCreatingTable && !isCreatingTable.value))
            return;
        createNode(clientX, clientY);
        await nextTick();
        isCreatingTable.value = false;
        canShow.value = false;
        Object.assign(draggableContainer.value.style, {
            cursor: null,
        });
    });

    return {
        canShow,
        isDragging,
    };
}
