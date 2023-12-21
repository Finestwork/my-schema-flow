<script setup lang="ts">
import CustomNodeHandles from '@components/Modules/Canvas/Partials/CustomNodeHandles.vue';
import { formatColumnForNodeCanvas } from '@utilities/TableHelper';
import { jellyAnimation } from '@utilities/AnimateHelper';
import { computed, ref, onMounted } from 'vue';
import type { TNode } from '@stores/Canvas';

const props = defineProps<TNode>();
const root = ref();
const getColumns = computed(() => {
    return formatColumnForNodeCanvas(props.data.table.columns);
});

onMounted(() => {
    jellyAnimation(root.value);
});
</script>

<template>
    <div
        ref="root"
        class="relative min-h-[150px] w-[350px] overflow-hidden rounded-lg border-2 font-neon-mono hover:cursor-pointer"
        :class="{
            'dark:border-cyan-600 dark:bg-dark-900': props.data.state.isActive,
            'dark:border-dark-700 dark:bg-dark-900': !props.data.state.isActive,
        }"
        :style="{
            opacity: props.data.style.opacity,
        }"
    >
        <CustomNodeHandles />
        <span
            class="block py-2 text-center text-sm font-bold"
            :class="{
                'dark:bg-cyan-950/30 dark:text-cyan-500':
                    props.data.state.isActive,
                'dark:bg-dark-800 dark:text-dark-100':
                    !props.data.state.isActive,
            }"
            >{{ props.data.table.name }}</span
        >
        <div class="py-2">
            <div
                v-for="column in getColumns"
                :key="column.name"
                class="flex justify-between px-3 py-3 text-sm font-bold"
            >
                <span class="mr-2 w-4/12 grow truncate dark:text-slate-400">{{
                    column.name
                }}</span>
                <span
                    class="w-4/12 grow truncate text-left dark:text-slate-600"
                    >{{ column.type }}</span
                >
                <span
                    class="w-2/12 grow truncate text-center dark:text-cyan-500"
                    >{{ column.keyConstraint }}</span
                >
            </div>
        </div>
    </div>
</template>
