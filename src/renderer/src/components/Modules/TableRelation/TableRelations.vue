<script setup lang="ts">
import VPanelSectionWrapper from '@components/Base/Layouts/VPanelSectionWrapper.vue';
import DefaultContent from '@components/Modules/TableRelation/Partials/DefaultContent.vue';
import { useCanvasStore } from '@stores/CanvasStore';
import type { TNode, TEdge } from '@stores/CanvasStore';

export type TProps = {
    edges: Array<TEdge>;
    nodes: Array<TNode>;
};
const props = defineProps<TProps>();
const canvasStore = useCanvasStore();
</script>

<template>
    <VPanelSectionWrapper>
        <template #label>Table Relation</template>
        <template #content>
            <div v-if="canvasStore.hasActiveNode">
                <DefaultContent :edges="props.edges" :nodes="props.nodes" />
            </div>
        </template>
    </VPanelSectionWrapper>
</template>
