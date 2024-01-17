<script setup lang="ts">
import VPanelActionButton from '@components/Base/Buttons/VPanelActionButton.vue';
import AddIcon from '@components/Shared/Icons/AddIcon.vue';
import { useCanvasStore } from '@stores/Canvas';
import { computed } from 'vue';

const emits = defineEmits<{
    (e: 'add-form'): void;
}>();
const { activeColumnIndex } = defineModels<{
    activeColumnIndex: number;
}>();

const canvasStore = useCanvasStore();
const indexes = computed(() => {
    if(canvasStore.hasActiveNode) return [];
    return canvasStore.currentActiveNode.data.table.indexes.map((index) => ({
        column: index.column,
        type: index.type.toUpperCase(),
    }));
});
</script>

<template>
    <div>
        <div v-if="indexes.length !== 0" class="mb-2">
            <button
                v-for="(attr, index) in indexes"
                :key="attr.attribute"
                type="button"
                class="mb-2 flex w-full rounded bg-dark-50/25 px-1.5 py-2 text-left text-xs font-semibold text-slate-700 outline-none last-of-type:mb-0 hover:bg-dark-50/40 dark:bg-dark-800/80 dark:text-slate-400 dark:hover:bg-dark-800/50 dark:focus:bg-dark-800/50"
                @dblclick="activeColumnIndex = index"
            >
                <span class="w-full flex-grow">{{ attr.column }}</span>
                <span class="w-full flex-grow font-bold">{{ attr.type }}</span>
            </button>
        </div>
        <VPanelActionButton @click="emits('add-form')">
            <template #icon>
                <AddIcon />
            </template>
            <template #text>Add Indexes</template>
        </VPanelActionButton>
    </div>
</template>
