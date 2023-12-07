<script setup lang="ts">
import VFloatingLayout from '@components/Shared/Layouts/VFloatingLayout.vue';
import VControlledTooltip from '@components/Shared/Tooltips/VControlledTooltip.vue';
import VChevronIcon from '@components/Shared/Icons/VChevronIcon.vue';
import { onClickOutside } from '@vueuse/core';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { nextTick, ref, watch } from 'vue';

const { showItems } = defineModels<{
    showItems: boolean;
}>();
const floatingLayout = ref();
const floatingElement = ref();
const isActive = ref(false);
const showTooltip = ref(false);
const { activate, deactivate } = useFocusTrap(floatingElement, { allowOutsideClick: true });
const onClickToggleActiveState = () => {
    isActive.value = !isActive.value;
    showItems.value = !showItems.value;
};
onClickOutside(floatingLayout, () => {
    isActive.value = false;
    showItems.value = false;
});
watch(showItems, async (shouldShow) => {
    await nextTick();
    if (shouldShow) activate();
    else deactivate();
});
</script>

<template>
    <VControlledTooltip :should-show-tooltip="!showItems">
        <VFloatingLayout
            ref="floatingLayout"
            class="relative inline-flex h-[25px] w-[40px]"
            :show="showItems"
            :offset-y="2"
            @mouseenter="showTooltip = true"
            @mouseleave="showTooltip = false"
        >
            <button
                class="flex h-full w-full items-center rounded px-1.5 outline-none"
                type="button"
                :class="{
                    'dark:bg-dark-600 dark:stroke-slate-400 dark:hover:bg-blue-950/60 hover:dark:stroke-blue-500 dark:focus:bg-blue-950/60 focus:dark:stroke-blue-500':
                        !isActive,
                    'dark:bg-blue-950/60 dark:stroke-blue-500': isActive,
                }"
                @click="onClickToggleActiveState"
            >
                <span class="mr-1.5 block h-[60%] w-auto">
                    <slot></slot>
                </span>
                <span class="block h-full w-[25%]">
                    <VChevronIcon />
                </span>
            </button>

            <template #float>
                <div
                    ref="floatingElement"
                    class="overflow-hidden rounded shadow-xl dark:bg-dark-700"
                >
                    <slot name="float"></slot>
                </div>
            </template>
        </VFloatingLayout>

        <template #tooltip>
            <span
                class="left-0 top-0 whitespace-nowrap rounded-lg px-2 py-2 text-xs font-semibold shadow-xl dark:bg-dark-700 dark:text-slate-300"
            >
                <slot name="tooltip"></slot>
            </span>
        </template>
    </VControlledTooltip>
</template>
