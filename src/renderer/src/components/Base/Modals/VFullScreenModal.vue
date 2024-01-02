<script setup lang="ts">
import CloseIcon from '@components/Shared/Icons/CloseIcon.vue';
</script>
<template>
    <div
        class="fixed top-[44px] h-[calc(100vh-44px)] w-full bg-white px-2 py-2"
    >
        <button
            type="button"
            class="duration-750 ml-auto block h-[25px] w-[25px] rounded-full border-none bg-rose-600 stroke-slate-50 p-2 outline-none transition-shadow hover:bg-rose-700 focus-visible:ring-4 focus-visible:ring-rose-600/30"
        >
            <CloseIcon />
        </button>
        <slot></slot>
    </div>
</template>
