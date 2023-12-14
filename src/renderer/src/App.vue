<script setup lang="ts">
import TitleBar from '@components/Modules/TitleBar/TitleBar.vue';
import Canvas from '@components/Modules/Canvas/Canvas.vue';
</script>

<template>
    <div class="dark text-black">
        <TitleBar />
        <div class="flex h-screen w-full dark:bg-dark-900">
            <div class="w-full max-w-[250px] dark:bg-dark-900"></div>
            <div class="w-full">
                <Canvas />
            </div>
            <div class="w-full max-w-[250px] dark:bg-dark-900"></div>
        </div>
    </div>
</template>
