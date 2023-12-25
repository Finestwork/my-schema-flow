<script setup lang="ts">
export type TProps = {
    windows: Array<string>;
    mac: Array<string>;
};

const props = defineProps<TProps>();
</script>

<template>
    <div class="py-1 dark:text-slate-400">
        <span class="mb-1.5 block dark:text-slate-100"
            ><slot name="label"></slot
        ></span>
        <div class="mb-2.5 block">
            <span> Windows: </span>
            <template v-for="(window, ind) in props.windows" :key="window">
                <template v-if="ind !== props.windows.length - 1">
                    <span
                        class="rounded px-[.2rem] py-[.1rem] text-cyan-500 dark:bg-dark-950/40"
                        >{{ window }}</span
                    >
                    +
                </template>
                <span
                    v-else
                    class="rounded px-[.2rem] py-[.1rem] text-cyan-500 dark:bg-dark-950/40"
                    >{{ window }}</span
                >
            </template>
        </div>

        <div>
            <span> macOS: </span>
            <template v-for="(macKey, ind) in props.mac" :key="macKey">
                <template v-if="ind !== props.mac.length - 1">
                    <span
                        class="rounded px-[.2rem] py-[.1rem] text-cyan-500 dark:bg-dark-950/40"
                        >{{ macKey }}</span
                    >
                    +
                </template>
                <span
                    v-else
                    class="rounded px-[.2rem] py-[.1rem] text-cyan-500 dark:bg-dark-950/40"
                    >{{ macKey }}</span
                >
            </template>
        </div>
    </div>
</template>
