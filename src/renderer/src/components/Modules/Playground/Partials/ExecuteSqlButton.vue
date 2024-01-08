<script setup lang="ts">
export type TProps = {
    colorScheme?: 'default' | 'danger';
};
const emits = defineEmits<{
    (event: 'click', value: Event);
}>();
const props = withDefaults(defineProps<TProps>(), {
    colorScheme: 'default',
});
</script>

<template>
    <button
        type="button"
        class="group flex items-center justify-center rounded px-1 py-2.5 font-semibold outline-none"
        :class="{
            'bg-cyan-600 hover:bg-cyan-600/90 focus:bg-cyan-600/90 dark:bg-dark-700/70 hover:dark:bg-cyan-950/50 focus:dark:bg-cyan-950/50':
                props.colorScheme === 'default',
            'bg-rose-600 hover:bg-rose-600/90 focus:bg-rose-600/90 dark:bg-rose-500 dark:hover:bg-rose-500/90 dark:focus:bg-rose-500/90':
                props.colorScheme === 'danger',
        }"
        @click="emits('click', $event)"
    >
        <span
            class="text-xs"
            :class="{
                'text-cyan-50 dark:text-slate-400 group-hover:dark:text-cyan-500 group-focus:dark:text-cyan-500':
                    props.colorScheme === 'default',
                'text-rose-50': props.colorScheme === 'danger',
            }"
        >
            <slot name="text">Submit</slot>
        </span>
    </button>
</template>
