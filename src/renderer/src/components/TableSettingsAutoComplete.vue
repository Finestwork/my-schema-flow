<script setup lang="ts">
import TableInfoTextInput from '@components/TableInfoTextInput.vue';
import type { TProps } from '@components/TableInfoTextInput.vue';
import { computePosition, size } from '@floating-ui/dom';
import { nextTick, ref, onMounted } from 'vue';

const props = defineProps<TProps>();
const { modelValue } = defineModels<{
    modelValue: string;
}>();
const source = ref();
const floatingDropdown = ref();
onMounted(async () => {
    await nextTick();
    const Middlewares = [
        size({
            apply({ rects }) {
                Object.assign(floatingDropdown.value.style, {
                    width: `${rects.reference.width}px`,
                });
            },
        }),
    ];
    computePosition(source.value, floatingDropdown.value, { middleware: Middlewares }).then(
        ({ x, y }) => {
            Object.assign(floatingDropdown.value.style, {
                top: `${y}px`,
                left: `${x}px`,
            });
        },
    );
});
</script>

<template>
    <div ref="source">
        <TableInfoTextInput :id="props.id" :placeholder="props.placeholder" v-model="modelValue">
            <template #label>
                <slot name="label"></slot>
            </template>
        </TableInfoTextInput>

        <div
            ref="floatingDropdown"
            class="scrollbar-slim absolute max-h-[200px] overflow-y-scroll bg-white shadow-xl dark:bg-dark-700"
        >
            <slot name="float"></slot>
        </div>
    </div>
</template>
