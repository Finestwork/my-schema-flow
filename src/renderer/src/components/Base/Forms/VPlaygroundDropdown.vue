<script setup lang="ts">
type TProps = {
    id: string;
};

const props = defineProps<TProps>();
const emits = defineEmits<{
    (event: 'onChange', value: Event): void;
}>();
const { modelValue } = defineModels<{
    modelValue: string;
}>();
</script>

<template>
    <div>
        <label
            v-if="$slots.label"
            :for="props.id"
            class="cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300"
        >
            <slot name="label"></slot>
        </label>
        <select
            :id="props.id"
            v-model="modelValue"
            class="block w-full rounded border-2 border-gray-400 bg-transparent p-1.5 text-xs font-bold text-slate-500 outline-none ring-0 ring-cyan-500/50 transition-shadow duration-150 ease-in-out hover:border-cyan-500 hover:text-gray-900 focus:text-gray-900 focus-visible:border-cyan-500 focus-visible:ring-4 dark:border-slate-700 dark:text-slate-500 dark:placeholder-slate-600 dark:hover:border-cyan-500 hover:dark:text-slate-300 dark:focus:border-cyan-500 dark:focus:text-slate-300"
            @change="emits('onChange', $event)"
        >
            <slot></slot>
        </select>
    </div>
</template>
