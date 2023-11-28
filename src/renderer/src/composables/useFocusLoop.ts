import { ref } from 'vue';
import type { Ref } from 'vue';

export const useFocusLoop = (wrapper: Ref<HTMLElement>) => {
    const CurrentIndex = ref(-1);
    const Elements: Ref<Node[]> = ref([]);
    const CurrentActiveEl: Ref<HTMLElement> = ref();

    const scrollElementTo = () => {
        CurrentActiveEl.value = Elements.value[CurrentIndex.value];
        wrapper.value.scrollTo(0, CurrentActiveEl.value.offsetTop);
        setTimeout(() => {
            CurrentActiveEl.value.focus();
        }, 50);
    };
    const focusNext = () => {
        if (CurrentIndex.value >= Elements.value.length - 1) {
            CurrentIndex.value = 0;
        } else {
            CurrentIndex.value++;
        }
        scrollElementTo();
    };
    const focusPrevious = () => {
        if (CurrentIndex.value <= 0) {
            CurrentIndex.value = Elements.value.length - 1;
        } else {
            CurrentIndex.value--;
        }

        scrollElementTo();
    };
    const onKeydown = (e: MouseEvent) => {
        e.preventDefault();
        if (e.key.toLowerCase() === 'arrowdown') {
            focusNext();
        }
        if (e.key.toLowerCase() === 'arrowup') {
            focusPrevious();
        }
    };

    const getFocusableElements = () => {
        Elements.value = wrapper.value.querySelectorAll('button');
        wrapper.value.removeEventListener('keydown', onKeydown);
        wrapper.value.addEventListener('keydown', onKeydown);
    };

    return {
        currentIndex: CurrentIndex,
        focusNext,
        focusPrevious,
        getFocusableElements,
    };
};
