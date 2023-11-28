<script setup lang="ts">
type TProps = {
    id: string;
    placeholder: string;
    modelValue: string;
};

const props = defineProps<TProps>();
const { modelValue } = defineModels<{
    modelValue: string;
}>();
</script>

<template>
    <div>
        <label
            class="mb-2 inline-flex cursor-pointer text-xs font-medium dark:text-slate-300"
            :for="props.id"
        >
            <slot name="label"></slot>
        </label>
        <input
            class="block w-full rounded-sm border-2 bg-transparent px-1.5 py-1.5 text-xs font-semibold outline-none transition-shadow duration-300 focus:ring-4 focus:ring-blue-500/60 dark:border-slate-300 dark:text-slate-300 dark:focus:border-blue-300"
            type="text"
            :placeholder="props.placeholder"
            :id="props.id"
            v-number-only
            v-model="modelValue"
        />
    </div>
</template>
