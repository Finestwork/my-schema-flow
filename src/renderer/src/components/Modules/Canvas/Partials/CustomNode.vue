<script setup lang="ts">
import CustomNodeHandles from '@components/Modules/Canvas/Partials/CustomNodeHandles.vue';
import { formatColumnForNodeCanvas } from '@utilities/TableHelper';
import { jellyAnimation } from '@utilities/AnimateHelper';
import { isCreatingTableKey } from '@symbols/Canvas';
import { computed, ref, onMounted, inject } from 'vue';
import type { TNodeData } from '@stores/Canvas';

export type TProps = {
    id: string;
    data: TNodeData;
};
const props = defineProps<TProps>();
const isCreatingTable = inject(isCreatingTableKey);
const root = ref();
const getColumns = computed(() => {
    return formatColumnForNodeCanvas(props.data.table.columns);
});
const isFaded = computed(
    () => !props.data.states.isActive && props.data.states.isFaded,
);
const isActive = computed(
    () => props.data.states.isActive && !props.data.states.isFaded,
);
const isDefault = computed(
    () => !props.data.states.isActive && !props.data.states.isFaded,
);

onMounted(() => {
    if (!isCreatingTable?.value ?? false) return;
    jellyAnimation(root.value);
});
</script>

<template>
    <div ref="root" class="relative">
        <CustomNodeHandles
            :node-id="props.id"
            :is-active="isActive"
            :is-faded="isFaded"
        />
        <div
            class="min-h-[150px] w-[350px] overflow-hidden rounded-lg border-2 bg-white font-neon-mono hover:cursor-pointer dark:bg-dark-900"
            :class="{
                'border-cyan-500 dark:border-cyan-600': isActive,
                'border-slate-300 dark:border-dark-700': isDefault,
                'border-slate-100 dark:border-dark-800': isFaded,
            }"
        >
            <span
                class="block truncate px-1 py-2 text-center text-sm font-bold"
                :class="{
                    'bg-cyan-500 text-cyan-50 dark:bg-cyan-950/30 dark:text-cyan-500':
                        isActive,
                    'bg-slate-200 text-slate-800 dark:bg-dark-800 dark:text-dark-100':
                        isDefault,
                    'bg-slate-100 text-slate-300 dark:bg-dark-800/40 dark:text-dark-700':
                        isFaded,
                }"
                >{{ props.data.table.name }}</span
            >
            <div
                v-for="column in getColumns"
                :key="column.name"
                class="flex justify-between px-3 py-3 text-sm font-bold"
                :class="{
                    'bg-cyan-600': column.shouldHighlight,
                }"
            >
                <span
                    class="mr-2 w-4/12 grow truncate"
                    :class="{
                        'text-slate-800 dark:text-slate-400':
                            (isActive || isDefault) &&
                            !isFaded &&
                            !column.shouldHighlight,
                        'text-slate-600/40 dark:text-slate-700/50':
                            !(isActive || isDefault) &&
                            isFaded &&
                            !column.shouldHighlight,
                        'text-cyan-50':
                            !isActive &&
                            isDefault &&
                            !isFaded &&
                            column.shouldHighlight,
                    }"
                    >{{ column.name }}</span
                >
                <span
                    class="w-4/12 grow truncate text-left"
                    :class="{
                        'text-slate-500 dark:text-slate-600':
                            (isActive || isDefault) &&
                            !isFaded &&
                            !column.shouldHighlight,
                        'text-slate-400/50 dark:text-slate-700/50':
                            !(isActive || isDefault) &&
                            isFaded &&
                            !column.shouldHighlight,
                        'text-cyan-200':
                            !isActive &&
                            isDefault &&
                            !isFaded &&
                            column.shouldHighlight,
                    }"
                    >{{ column.type }}</span
                >
                <span
                    class="w-2/12 grow truncate text-center"
                    :class="{
                        'text-cyan-500':
                            (isActive || isDefault) &&
                            !isFaded &&
                            !column.shouldHighlight,
                        'text-slate-700/50':
                            !(isActive || isDefault) &&
                            isFaded &&
                            !column.shouldHighlight,
                        'text-cyan-200':
                            !isActive &&
                            isDefault &&
                            !isFaded &&
                            column.shouldHighlight,
                    }"
                    >{{ column.keyConstraint }}</span
                >
            </div>
        </div>
    </div>
</template>
