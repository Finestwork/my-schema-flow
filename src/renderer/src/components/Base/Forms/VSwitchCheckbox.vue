<script setup lang="ts">
type TProps = {
    for: string;
    id: string;
};
const props = defineProps<TProps>();
const { modelValue } = defineModels<{
    modelValue: Array<string> | boolean;
}>();
</script>

<template>
    <div class="flex items-center">
        <input
            :id="props.id"
            v-model="modelValue"
            type="checkbox"
            class="peer hidden"
        />
        <label
            ref="label"
            :for="props.for"
            class="before:duration-750 relative block h-[20px] w-[45px] cursor-pointer rounded-full bg-slate-400 before:absolute before:left-[2px] before:top-2/4 before:h-[16px] before:w-[16px] before:-translate-y-2/4 before:rounded-full before:bg-slate-100 before:transition-all hover:bg-slate-500/80 peer-checked:bg-cyan-700 peer-checked:before:left-[calc(100%-2px)] peer-checked:before:-translate-x-full peer-active:before:w-[80%]"
        />

        <span class="ml-2 text-sm font-bold text-slate-800"
            ><slot name="label"></slot
        ></span>
    </div>
</template>
