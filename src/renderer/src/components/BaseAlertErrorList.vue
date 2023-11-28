<script setup lang="ts">
export type TAlert = {
    items: string[];
    colorScheme?: 'success' | 'danger';
};
const { items, colorScheme } = withDefaults(defineProps<TAlert>(), {
    colorScheme: 'success',
});
</script>

<template>
    <ul
        class="block rounded p-2 text-xs font-semibold dark:text-white"
        :class="{
            'dark:bg-emerald-500/80': colorScheme === 'success',
            'dark:bg-rose-500/90': colorScheme === 'danger',
        }"
    >
        <li class="mb-1.5 last-of-type:mb-0" v-for="item in items">{{ item }}</li>
    </ul>
</template>
