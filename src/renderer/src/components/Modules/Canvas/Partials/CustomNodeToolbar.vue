<script setup lang="ts">
import VNodeToolbarButtonIcon from '@components/Base/ButtonIcons/VNodeToolbarButtonIcon.vue';
import TrashIcon from '@components/Shared/Icons/TrashIcon.vue';
import CopyIcon from '@components/Shared/Icons/CopyIcon.vue';
import { useTableNodeCopy } from '@composables/Nodes/useTableNodeCopy';
import { vueFlowKey } from '@symbols/VueFlow';
import { inject } from 'vue';

const { copyTable } = useTableNodeCopy();
const VueFlow = inject(vueFlowKey);

const onClickDeleteTable = () => {
    if (!VueFlow) return;
};
</script>
<template>
    <div
        class="absolute left-0 top-0 flex w-full -translate-y-full justify-end pb-2"
    >
        <VNodeToolbarButtonIcon class="mr-2" @on-click="copyTable">
            <CopyIcon />
            <template #tooltip>Copy Table</template>
        </VNodeToolbarButtonIcon>
        <VNodeToolbarButtonIcon
            color-scheme="danger"
            @on-click="onClickDeleteTable"
        >
            <TrashIcon />
            <template #tooltip>Delete Table</template>
        </VNodeToolbarButtonIcon>
    </div>
</template>
