<script setup lang="ts">
import VTooltip from '@components/Base/Layouts/VTooltip.vue';
import VFloatingLayout from '@components/Base/Layouts/VFloatingLayout.vue';
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
    showFloatingLayout.value = !showFloatingLayout.value;
    tooltip.value.showTooltip = !showFloatingLayout.value;
    emits('click', e);
};
onClickOutside(reference, () => {
    showFloatingLayout.value = false;
});
</script>

<template>
    <VFloatingLayout :show="showFloatingLayout">
        <VTooltip
            ref="tooltip"
            :offset-y="11"
            :can-show-tooltip="!showFloatingLayout"
        >
            <button
                ref="reference"
                type="button"
                class="flex h-[25px] items-center justify-center rounded p-1.5 outline-none dark:bg-dark-700/60 dark:stroke-dark-300 dark:hover:bg-cyan-950/60 hover:dark:stroke-cyan-500 dark:focus:bg-cyan-950/60 focus:dark:stroke-cyan-500"
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
                <slot name="tooltip"></slot>
            </template>
        </VTooltip>

        <template #float>
            <slot name="float"></slot>
        </template>
    </VFloatingLayout>
</template>
