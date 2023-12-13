<script setup lang="ts">
import TitleBar from '@components/modules/TitleBar/TitleBar.vue';
</script>

<template>
    <div class="dark text-black">
        <TitleBar />
        <div class="flex h-screen w-full dark:bg-dark-900">
            <div class="w-full max-w-[250px] dark:bg-dark-850"></div>
            <div class="w-full"></div>
            <div class="w-full max-w-[250px] dark:bg-dark-850"></div>
        </div>
    </div>
</template>
