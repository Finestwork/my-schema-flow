<script setup lang="ts">
import VBlurredModal from '@components/Base/Modals/VBlurredModal.vue';
</script>
<template>
    <VBlurredModal>
        <div class="rounded-lg bg-white p-4 shadow-sm">
            <span
                class="before:animate-infinite-progress relative mx-auto block h-[3px] w-[80%] overflow-hidden rounded-full bg-cyan-950 before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-cyan-500"
            ></span>
            <p class="mt-1.5 text-xs font-semibold text-slate-500">
                Loading your diagram,
                <span
                    class="border-b-[1px] border-dashed border-b-cyan-500 text-cyan-500"
                    >please stand by</span
                >. It's like baking a cake, you wouldn't rush it,
                <span
                    class="border-b-[1px] border-dashed border-b-cyan-500 text-cyan-500"
                    >would you</span
                >?
            </p>
        </div>
    </VBlurredModal>
</template>
