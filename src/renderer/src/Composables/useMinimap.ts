import { ref } from 'vue';
import type { Ref, MaybeRefOrGetter } from 'vue';

export function useMinimap(minimap: MaybeRefOrGetter) {
    const nodeIds: Ref<string[]> = ref([]);
    const highlightNodes = () => {
        nodeIds.value.forEach((id) => {
            const Rect = minimap.value.$el.querySelector(`rect[id='${id}']`);
            Rect.classList.add('active');
        });
    };
    const unHighlightNodes = () => {
        nodeIds.value.forEach((id) => {
            const Rect = minimap.value.$el.querySelector(`rect[id='${id}']`);
            Rect.classList.remove('active');
        });
        nodeIds.value = [];
    };
    return {
        nodeIds,
        highlightNodes,
        unHighlightNodes,
    };
}
