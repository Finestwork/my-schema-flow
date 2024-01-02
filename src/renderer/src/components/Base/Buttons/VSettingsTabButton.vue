<script setup lang="ts">
type TProps = {
    isActive: boolean;
};

const props = defineProps<TProps>();
</script>
<template>
    <button
        type="button"
        class="w-full rounded-md p-2 text-left text-xs font-bold outline-none"
        :class="{
            'text-slate-900 hover:bg-slate-200 focus-visible:bg-slate-200':
                !props.isActive,
            'bg-cyan-100 text-cyan-600 hover:bg-cyan-200/70 focus-visible:bg-cyan-200/70':
                props.isActive,
        }"
    >
        <slot></slot>
    </button>
</template>
