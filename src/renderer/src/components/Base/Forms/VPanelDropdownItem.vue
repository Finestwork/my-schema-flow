<script setup lang="ts">
type TProps = {
    value: string;
};
const props = defineProps<TProps>();
</script>
<template>
    <option
        :value="props.value"
        class="font-semibold text-slate-900 dark:text-slate-300"
    >
        <slot></slot>
    </option>
</template>
