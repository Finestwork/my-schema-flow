<script setup lang="ts">
import VPanelSectionWrapper from '@components/Base/Wrappers/VPanelSectionWrapper.vue';
import DefaultContent from '@components/Modules/TableInformationSection/Partials/DefaultContent.vue';
import { useCanvasStore } from '@stores/Canvas';
import { ref } from 'vue';

const canvasStore = useCanvasStore();
const currentColumnIndex = ref(-1);
</script>
<template>
    <VPanelSectionWrapper>
        <template #label>Table Information</template>
        <template #content>
            <div v-if="canvasStore.hasActiveNode">
                <DefaultContent :current-column-index="currentColumnIndex" />
            </div>
        </template>
    </VPanelSectionWrapper>
</template>
