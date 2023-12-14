<script setup lang="ts">
import VPanelSectionWrapper from '@components/Base/Layouts/VPanelSectionWrapper.vue';
</script>
<template>
    <VPanelSectionWrapper>
        <template #label>Table Information</template>
        <template #content>
            <div class="mt-2.5">
                <p
                    class="mb-2 text-xs text-slate-500 last-of-type:mb-0"
                    v-for="n in 10"
                    :key="n"
                >
                    Hasdkjhsd ajk asdkjhasdkja khdajk
                </p>
            </div>
        </template>
    </VPanelSectionWrapper>
</template>
