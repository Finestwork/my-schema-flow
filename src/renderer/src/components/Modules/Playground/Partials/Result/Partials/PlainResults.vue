<script setup lang="ts">
const props = defineProps<{
    items: Array<string>;
}>();
</script>
<template>
    <table
        class="w-full border-2 border-slate-300 pl-2 text-xs dark:border-dark-500"
    >
        <thead>
            <tr>
                <th
                    class="bg-slate-300 text-left font-bold text-slate-800 dark:bg-dark-700 dark:text-slate-400"
                >
                    <span class="block p-2">
                        <slot name="header"></slot>
                    </span>
                </th>
            </tr>
        </thead>
        <tbody class="font-bold">
            <tr
                v-for="item in props.items"
                :key="item"
                class="bg-slate-200 text-[.7rem] text-slate-700 odd:bg-transparent dark:bg-dark-800/50 dark:text-slate-100"
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
