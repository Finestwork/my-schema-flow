<script setup lang="ts">
import { computePosition, offset, flip, shift } from '@floating-ui/dom';
import { ref, nextTick, watch } from 'vue';
import type { Ref } from 'vue';

export type TFloatingLayout = {
    show: boolean;
    offsetY?: number;
};

const props = withDefaults(defineProps<TFloatingLayout>(), {
    offsetY: 0,
});
const source: Ref<HTMLElement | null> = ref(null);
const float: Ref<HTMLElement | null> = ref(null);

watch(
    () => props.show,
    async (showing) => {
        await nextTick();
        if (showing) {
            if (!source.value || !float.value) return;
            const Middlewares = [offset({ mainAxis: props.offsetY }), flip(), shift()];
            computePosition(source.value, float.value, { middleware: Middlewares }).then(
                ({ x, y }) => {
                    if (!float.value) return;
                    Object.assign(float.value.style, {
                        left: `${x}px`,
                        top: `${y}px`,
                    });
                },
            );
        }
    },
);
</script>
<template>
    <div ref="source">
        <slot></slot>
        <div v-if="show" ref="float" class="absolute z-50">
            <slot name="float"></slot>
        </div>
    </div>
</template>
