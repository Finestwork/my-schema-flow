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
    <div
        ref="root"
        class="relative min-h-[150px] w-[350px] overflow-hidden rounded-lg border-2 font-neon-mono hover:cursor-pointer"
        :class="{
            'dark:border-cyan-600 dark:bg-dark-900': isActive,
            'dark:border-dark-700 dark:bg-dark-900': isDefault,
            'dark:border-dark-800 dark:bg-dark-900': isFaded,
        }"
    >
        <CustomNodeHandles />
        <span
            class="block truncate px-1 py-2 text-center text-sm font-bold"
            :class="{
                'dark:bg-cyan-950/30 dark:text-cyan-500': isActive,
                'dark:bg-dark-800 dark:text-dark-100': isDefault,
                'dark:bg-dark-800/40 dark:text-dark-700': isFaded,
            }"
            >{{ props.data.table.name }}</span
        >
        <div class="py-2">
            <div
                v-for="column in getColumns"
                :key="column.name"
                class="flex justify-between px-3 py-3 text-sm font-bold"
            >
                <span
                    class="mr-2 w-4/12 grow truncate"
                    :class="{
                        'dark:text-slate-400':
                            (isActive || isDefault) && !isFaded,
                        'dark:text-slate-700/50':
                            !(isActive || isDefault) && isFaded,
                    }"
                    >{{ column.name }}</span
                >
                <span
                    class="w-4/12 grow truncate text-left"
                    :class="{
                        'dark:text-slate-600':
                            (isActive || isDefault) && !isFaded,
                        'dark:text-slate-700/50':
                            !(isActive || isDefault) && isFaded,
                    }"
                    >{{ column.type }}</span
                >
                <span
                    class="w-2/12 grow truncate text-center"
                    :class="{
                        'dark:text-cyan-500':
                            (isActive || isDefault) && !isFaded,
                        'dark:text-slate-700/50':
                            !(isActive || isDefault) && isFaded,
                    }"
                    >{{ column.keyConstraint }}</span
                >
            </div>
        </div>
    </div>
</template>
