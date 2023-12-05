import type { Ref } from 'vue';
import { ref } from 'vue';

export const useFocusLoop = (
    wrapper: Ref<HTMLElement>,
    elements: Ref<NodeListOf<HTMLButtonElement>>,
) => {
    const CurrentIndex = ref(-1);
    const CurrentActiveEl: Ref<HTMLElement | null> = ref(null);

    const scrollElementTo = () => {
        if (!elements.value || !wrapper.value) return;
        CurrentActiveEl.value = elements.value[CurrentIndex.value];
        wrapper.value.scrollTo(0, CurrentActiveEl.value.offsetTop);
        CurrentActiveEl?.value?.focus();
    };
    const focusNext = () => {
        if (!elements.value) return;

        if (CurrentIndex.value >= elements.value.length - 1) {
            CurrentIndex.value = 0;
        } else {
            CurrentIndex.value++;
        }

        scrollElementTo();
    };
    const focusPrevious = () => {
        if (!elements.value) return;

        if (CurrentIndex.value <= 0) {
            CurrentIndex.value = elements.value.length - 1;
        } else {
            CurrentIndex.value--;
        }

        scrollElementTo();
    };

    return {
        currentIndex: CurrentIndex,
        focusNext,
        focusPrevious,
    };
};
