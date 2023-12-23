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
        class="group flex w-full items-center justify-center rounded px-1 py-2 font-semibold outline-none"
        :class="{
            'dark:bg-dark-800 hover:dark:bg-cyan-950/50 focus:dark:bg-cyan-950/50':
                props.colorScheme === 'default',
            'dark:bg-rose-500 dark:hover:bg-rose-500/90 dark:focus:bg-rose-500/90':
                props.colorScheme === 'danger',
        }"
        @click="emits('click', $event)"
    >
        <span
            class="mr-1 block w-[10px]"
            :class="{
                'dark:stroke-slate-400 group-hover:dark:stroke-cyan-500 group-focus:dark:stroke-cyan-500':
                    props.colorScheme === 'default',
                'dark:stroke-rose-50': props.colorScheme === 'danger',
            }"
        >
            <slot name="icon"></slot>
        </span>
        <span
            class="text-xs"
            :class="{
                'dark:text-slate-400 group-hover:dark:text-cyan-500 group-focus:dark:text-cyan-500':
                    props.colorScheme === 'default',
                'dark:text-rose-50': props.colorScheme === 'danger',
            }"
        >
            <slot name="text"></slot>
        </span>
    </button>
</template>
