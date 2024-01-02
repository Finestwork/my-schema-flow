<script setup lang="ts">
import ChevronIcon from '@components/Shared/Icons/ChevronIcon.vue';
import { onClickOutside } from '@vueuse/core';
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { flip, shift, useFloating } from '@floating-ui/vue';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';

const root = ref();
const reference = ref();
const floating = ref();
const showDropdown = ref(false);
const Middlewares = [shift(), flip()];
const { floatingStyles, update } = useFloating(reference, floating, {
    middleware: Middlewares,
});
const { activate, deactivate } = useFocusTrap(floating, {
    escapeDeactivates: true,
    allowOutsideClick: true,
    returnFocusOnDeactivate: false,
});
onMounted(() => {
    window.addEventListener('resize', update);
});
onUnmounted(() => {
    window.removeEventListener('resize', update);
});
onClickOutside(root, () => (showDropdown.value = false));
defineExpose({
    showDropdown,
});
watch(
    showDropdown,
    async (value) => {
        await nextTick();
        if (value) activate();
        else deactivate();
    },
    { flush: 'post' },
);
</script>
<template>
    <div ref="root" class="inline-flex">
        <button
            ref="reference"
            type="button"
            class="duration-750 flex items-center rounded-lg bg-cyan-600 p-2 outline-none transition-shadow hover:bg-cyan-700/90 focus-visible:ring-4 focus-visible:ring-cyan-500/50"
            @click="showDropdown = !showDropdown"
        >
            <span class="mr-2 text-xs font-bold text-cyan-50">
                <slot name="label"></slot>
            </span>
            <span class="mt-[.1rem] flex w-[10px] items-center stroke-cyan-50">
                <ChevronIcon />
            </span>
        </button>

        <div
            v-if="showDropdown"
            ref="floating"
            class="shadow-xs overflow-hidden rounded-lg border-2 border-slate-200 bg-white"
            :style="floatingStyles"
        >
            <slot name="dropdown"></slot>
        </div>
    </div>
</template>
