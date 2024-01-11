<script setup lang="ts">
const props = defineProps<{
    items: Array<string>;
}>();
</script>
<template>
    <table class="w-full pl-2 font-neon-mono text-xs">
        <thead>
            <tr>
                <th
                    class="bg-slate-300 text-left font-black text-slate-800 dark:bg-dark-700 dark:text-slate-400"
                >
                    <span class="block p-2">
                        <slot name="header"></slot>
                    </span>
                </th>
            </tr>
        </thead>
        <tbody class="font-semibold">
            <tr
                v-for="item in props.items"
                :key="item"
                class="bg-slate-200 text-slate-700 odd:bg-transparent dark:bg-dark-800 dark:text-slate-100"
            >
                <td>
                    <span class="block p-2">
                        {{ item }}
                    </span>
                </td>
            </tr>
        </tbody>
    </table>
</template>
