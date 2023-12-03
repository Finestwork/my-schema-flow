<script setup lang="ts">
import IconCheck from '@components/IconCheck.vue';
import { computed } from 'vue';
import anime from 'animejs/lib/anime';

type TProps = {
    id: string;
    value: string;
};
const props = defineProps<TProps>();
const { modelValue } = defineModels<{
    modelValue: boolean | Array<string>;
}>();
const isChecked = computed(() => {
    // Checks if modelValue is a boolean
    if (!Array.isArray(modelValue)) {
        return modelValue;
    }

    // Surely this is an array
    return modelValue.includes(props.value);
});
const onBeforeEnter = (el: Element) => {
    Object.assign((el as HTMLElement).style, {
        transform: 'scale(0)',
    });
};
const onEnter = (el: Element, done: () => void) => {
    anime({
        targets: el,
        scale: 1,
        complete: done,
    });
};
const onLeave = (el: Element, done: () => void) => {
    anime({
        targets: el,
        scale: 0,
        complete: done,
    });
};
const onBtnKeydown = (e: KeyboardEvent) => {
    if (e.code.toLowerCase() === 'space') {
        modelValue.value = !modelValue.value;
    }
};
</script>
<template>
    <div class="flex items-center">
        <input
            :id="props.id"
            v-model="modelValue"
            class="hidden appearance-none"
            type="checkbox"
            :value="props.value"
        />
        <button
            type="button"
            class="block h-[20px] w-[20px] rounded p-1 outline-none"
            :class="{
                'dark:bg-blue-600 dark:hover:bg-blue-600/90 dark:focus:bg-blue-600/90': isChecked,
                'dark:bg-dark-600/80 dark:hover:bg-dark-600 dark:focus:bg-dark-600': !isChecked,
            }"
            @click="modelValue = !modelValue"
            @keydown="onBtnKeydown"
        >
            <Transition @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
                <IconCheck v-if="isChecked" class="stroke-white" />
            </Transition>
        </button>
        <label
            :for="props.id"
            class="ml-1.5 cursor-pointer select-none text-sm font-semibold text-gray-900 dark:text-slate-300"
        >
            <slot name="label"></slot>
        </label>
    </div>
</template>
