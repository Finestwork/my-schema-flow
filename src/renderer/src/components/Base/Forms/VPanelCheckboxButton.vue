<script setup lang="ts">
type TProps = {
    id: string;
};
const props = defineProps<TProps>();
const { modelValue } = defineModels<{
    modelValue: boolean | Array<string>;
}>();
</script>
<template>
    <div class="flex items-center">
        <input
            :id="props.id"
            v-model="modelValue"
            type="checkbox"
            value=""
            class="h-3.5 w-3.5 rounded-sm bg-gray-300 outline-none ring-0 ring-cyan-500/50 transition-shadow checked:bg-cyan-600 hover:bg-gray-400/70 checked:hover:bg-cyan-600 focus-visible:bg-cyan-600 focus-visible:ring-4 dark:bg-dark-500 dark:checked:bg-cyan-500 dark:hover:bg-dark-500/90 dark:checked:hover:bg-cyan-500/90"
        />
        <label
            :for="props.id"
            class="ml-1 cursor-pointer select-none text-[.8rem] font-bold text-slate-700 dark:text-slate-300"
        >
            <slot name="label"></slot>
        </label>
    </div>
</template>
