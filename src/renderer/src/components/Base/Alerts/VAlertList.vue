<script setup lang="ts">
export type TProps = {
    items: Array<string>;
    type?: 'success' | 'danger';
};

const props = withDefaults(defineProps<TProps>(), {
    type: 'success',
});
</script>

<template>
    <ul
        class="rounded px-1.5 pb-2 pt-1.5 text-[.7rem] font-semibold shadow-[inset_0_-4px_0_0_rgba(255,255,255,0.15)]"
        :class="{
            'dark:bg-emerald-700 dark:text-emerald-50':
                props.type === 'success',
            'dark:bg-rose-800 dark:text-rose-50': props.type === 'danger',
        }"
    >
        <li
            v-for="(item, ind) in items"
            :key="`${item}${ind}`"
            class="mb-1 last-of-type:mb-0"
        >
            {{ item }}
        </li>
    </ul>
</template>
