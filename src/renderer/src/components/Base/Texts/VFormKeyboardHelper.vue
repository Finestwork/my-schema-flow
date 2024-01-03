<script setup lang="ts">
type TProps = {
    keys: Array<string>;
};
const props = defineProps<TProps>();
</script>
<template>
    <div
        class="flex items-center text-xs font-bold text-slate-800 dark:text-slate-500"
    >
        <slot name="label"></slot>

        <div class="flex items-center text-[.6rem]">
            <template v-for="(key, ind) in props.keys" :key="key">
                <template v-if="props.keys.length - 1 !== ind">
                    <span
                        class="ml-1 mr-1 block rounded-md bg-slate-100 px-2 py-1 text-slate-900 shadow-[inset_0_-4px_0_0_rgba(0,0,0,0.16)] dark:bg-dark-700 dark:text-slate-300"
                        >{{ key }}</span
                    >
                    +
                </template>
                <span
                    v-else
                    class="ml-1 block rounded-md bg-slate-100 px-2 py-1 text-slate-900 shadow-[inset_0_-4px_0_0_rgba(0,0,0,0.16)] dark:bg-dark-700 dark:text-slate-300"
                >
                    {{ key }}
                </span>
            </template>
        </div>
    </div>
</template>
