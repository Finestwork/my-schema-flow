<script setup lang="ts">
import VTooltip from '@components/Base/Floaters/VTooltip.vue';
import VFloatingLayout from '@components/Base/Floaters/VFloatingLayout.vue';
import ChevronIcon from '@components/Shared/Icons/ChevronIcon.vue';
import { onClickOutside } from '@vueuse/core';
import { ref } from 'vue';
import type { Ref } from 'vue';

const emits = defineEmits<{
    (e: 'click', event: MouseEvent): void;
}>();
const tooltip: Ref<InstanceType<typeof VTooltip> | null> = ref(null);
const reference = ref();
const showFloatingLayout = ref(false);
const onClick = (e: MouseEvent) => {
    if (tooltip.value === null) return;
    showFloatingLayout.value = !showFloatingLayout.value;
    tooltip.value.showTooltip = !showFloatingLayout.value;
    emits('click', e);
};
defineExpose({
    showFloatingLayout,
});
onClickOutside(reference, () => {
    showFloatingLayout.value = false;
});
</script>

<template>
    <VFloatingLayout :show="showFloatingLayout">
        <VTooltip ref="tooltip" :can-show-tooltip="!showFloatingLayout">
            <button
                ref="reference"
                type="button"
                class="flex h-[25px] items-center justify-center rounded p-1.5 outline-none"
                :class="{
                    'bg-slate-500 stroke-slate-50 hover:bg-cyan-500 hover:stroke-cyan-50 focus:bg-cyan-500 focus:stroke-cyan-50 dark:bg-dark-700/60 dark:stroke-dark-300 dark:hover:bg-cyan-950/60 hover:dark:stroke-cyan-500 dark:focus:bg-cyan-950/60 focus:dark:stroke-cyan-500':
                        !showFloatingLayout,
                    'bg-cyan-500 stroke-cyan-50 dark:bg-cyan-950/60 dark:stroke-cyan-500':
                        showFloatingLayout,
                }"
                @click="onClick"
            >
                <span class="block w-[14px]">
                    <slot></slot>
                </span>
                <span class="ml-1 block w-[9px]">
                    <ChevronIcon />
                </span>
            </button>

            <template #tooltip>
                <span class="m-1.5 block text-[.6rem]">
                    <slot name="tooltip"></slot>
                </span>
            </template>
        </VTooltip>

        <template #float>
            <slot name="float"></slot>
        </template>
    </VFloatingLayout>
</template>
