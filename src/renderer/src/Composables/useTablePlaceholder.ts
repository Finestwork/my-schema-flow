import type { MaybeRefOrGetter } from 'vue';
import { useVueFlow } from '@vue-flow/core';
import { ref } from 'vue';

export function useTablePlaceholder(placeholderElement: MaybeRefOrGetter) {
    const { vueFlowRef, project } = useVueFlow();
    const placeholderPosition = ref({
        x: -1,
        y: -1,
    });

    /**
     * Moves the placeholder element to the specified position relative to the Vue Flow container.
     */
    const movePlaceholder = (posX: number, posY: number) => {
        if (!vueFlowRef.value) return;
        const { left, top } = vueFlowRef.value.getBoundingClientRect();
        placeholderPosition.value = project({
            x: posX - left,
            y: posY - top,
        });
        Object.assign(placeholderElement.value.$el.style, {
            left: `${posX - left + 5}px`,
            top: `${posY - top + 5}px`,
        });
    };
    const resetPlaceholderPosition = () => {
        placeholderPosition.value.x = -1;
        placeholderPosition.value.y = -1;
    };

    return {
        placeholderPosition,
        movePlaceholder,
        resetPlaceholderPosition,
    };
}
