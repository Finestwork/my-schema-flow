<script setup lang="ts">
const props = defineProps<{
    shouldHide: boolean;
}>();
</script>
<template>
    <span
        class="min-h-[50px] w-[100px] overflow-hidden rounded border-2 font-jetbrains hover:cursor-pointer dark:border-slate-700 dark:bg-dark-800"
        :class="{
            'opacity-0': props.shouldHide,
            'opacity-50': !props.shouldHide,
        }"
    ></span>
</template>
