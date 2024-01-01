<script setup lang="ts">
import VNodeToolbarButtonIcon from '@components/Base/ButtonIcons/VNodeToolbarButtonIcon.vue';
import TrashIcon from '@components/Shared/Icons/TrashIcon.vue';
import CopyIcon from '@components/Shared/Icons/CopyIcon.vue';
import { useNodeActions } from '@composables/Nodes/useNodeActions';
import { vueFlowKey } from '@symbols/VueFlow';
import { inject } from 'vue';

const { copyNode, deleteNode } = useNodeActions();
const VueFlow = inject(vueFlowKey);
</script>
<template>
    <div
        class="absolute left-0 top-0 flex w-full -translate-y-full justify-end pb-2"
    >
        <VNodeToolbarButtonIcon class="mr-2" @on-click="copyNode">
            <CopyIcon />
            <template #tooltip>Copy Table</template>
        </VNodeToolbarButtonIcon>
        <VNodeToolbarButtonIcon color-scheme="danger" @on-click="deleteNode">
            <TrashIcon />
            <template #tooltip>Delete Table</template>
        </VNodeToolbarButtonIcon>
    </div>
</template>
