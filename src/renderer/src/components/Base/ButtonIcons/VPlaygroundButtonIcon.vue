<script setup lang="ts">
import VTooltip from '@components/Base/Floaters/VTooltip.vue';

type TProps = {
    disabled?: boolean;
};

const props = defineProps<TProps>();
const emits = defineEmits<{
    (e: 'onClick'): void;
}>();
</script>
<template>
    <VTooltip>
        <button
            type="button"
            class="h-[30px] w-[30px] rounded-full border-2 p-1.5 outline-none ring-0 transition-shadow"
            :class="{
                'border-slate-400 stroke-slate-400 ring-cyan-500/50 hover:border-cyan-600 hover:stroke-cyan-600 focus-visible:border-cyan-500 focus-visible:stroke-cyan-500 focus-visible:ring-4':
                    !props.disabled,
                'cursor-not-allowed border-slate-300 stroke-slate-300':
                    props.disabled,
            }"
            :disabled="props.disabled"
            @click="emits('onClick')"
        >
            <slot></slot>
        </button>

        <template #tooltip>
            <span class="block px-1.5 py-2 text-xs">
                <slot name="slot"></slot>
            </span>
        </template>
    </VTooltip>
</template>
