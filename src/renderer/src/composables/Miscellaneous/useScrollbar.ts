import { ClickScrollPlugin, OverlayScrollbars } from 'overlayscrollbars';
import { nextTick, onMounted, onUnmounted, toValue, watch, ref } from 'vue';
import type { MaybeRef } from 'vue';

export function useScrollbar(element: MaybeRef) {
    let instance: OverlayScrollbars | null = null;
    const elements = ref();

    const initializeScrollbar = async () => {
        await nextTick();
        const Wrapper = <HTMLElement>toValue(element);
        if (!Wrapper) return;
        OverlayScrollbars.plugin(ClickScrollPlugin);
        instance = OverlayScrollbars(Wrapper, {
            scrollbars: { clickScroll: true },
        });
        elements.value = instance.elements();
    };

    onMounted(initializeScrollbar);

    onUnmounted(() => {
        if (instance === null) return;
        instance.destroy();
    });

    watch(element, initializeScrollbar);

    return {
        elements,
    };
}
