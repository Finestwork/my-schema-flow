<script setup lang="ts">
import VPanelSectionWrapper from '@components/Base/Layouts/VPanelSectionWrapper.vue';
import DefaultContent from '@components/Modules/TableInformation/Partials/DefaultContent.vue';
import { useCanvasStore } from '@stores/CanvasStore';

const canvasStore = useCanvasStore();
</script>
<template>
    <VPanelSectionWrapper>
        <template #label>Table Information</template>
        <template #content>
            <DefaultContent v-if="canvasStore.hasActiveNode" />
        </template>
    </VPanelSectionWrapper>
</template>
