<script setup lang="ts">
type TProps = {
    keys: Array<string>;
};
const props = defineProps<TProps>();
</script>
<template>
    <div class="text-xs font-bold text-slate-800">
        <span> <slot name="label"></slot> </span>

        <template v-for="(key, ind) in props.keys" :key="key">
            <template v-if="props.keys.length - 1 !== ind">
                <span
                    class="rounded-md bg-slate-200 px-2 py-1 shadow-[inset_0_-4px_0_0_rgba(0,0,0,0.16)]"
                    >{{ key }}</span
                >
                +
            </template>
            <span
                v-else
                class="rounded-md bg-slate-200 px-2 py-1 shadow-[inset_0_-4px_0_0_rgba(0,0,0,0.16)]"
            >
                {{ key }}
            </span>
        </template>
    </div>
</template>
