<script setup lang="ts">
import CircleJson from '@lottie/CircleLoader.json';
import lottie from 'lottie-web';
import { nextTick, onMounted, ref } from 'vue';

const root = ref<HTMLSpanElement>();
onMounted(async () => {
    await nextTick();
    lottie.loadAnimation({
        container: root.value,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: CircleJson,
    });
});
</script>

<template>
    <span ref="root" class="block"></span>
</template>
