<script setup lang="ts">
import VPanelTextInput from '@components/Base/Forms/VPanelTextInput.vue';
import { mySqlDataTypes } from '@utilities/DatabaseHelper';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';
import { onClickOutside } from '@vueuse/core';
import { size } from '@floating-ui/vue';
import { useFloating } from '@floating-ui/vue';
import { ref } from 'vue';

const { modelValue } = defineModels<{
    modelValue: string;
}>();
const showDropdown = ref(false);
const rootWrapper = ref();
const reference = ref();
const floating = ref();
const { floatingStyles } = useFloating(reference, floating, {
    middleware: [
        size({
            apply({ rects, elements }) {
                // Change styles, e.g.
                Object.assign(elements.floating.style, {
                    width: `${rects.reference.width}px`,
                });
            },
        }),
    ],
});
const onClickToggleDropdown = (e: MouseEvent) => {
    const Target = e.target as HTMLElement;

    if (Target.tagName !== 'INPUT' && !floating.value.contains(Target)) {
        showDropdown.value = false;
    }
};
onClickOutside(rootWrapper, () => {
    showDropdown.value = false;
});
</script>

<template>
    <div ref="rootWrapper" @click="onClickToggleDropdown">
        <VPanelTextInput
            id="addColumnTypeForm"
            ref="reference"
            v-model="modelValue"
            placeholder="Place column type here"
            @focus="showDropdown = true"
        >
            <template #label>Column Type:</template>
        </VPanelTextInput>
        <div
            v-if="showDropdown"
            ref="floating"
            class="absolute h-[200px] overflow-hidden"
            :style="floatingStyles"
        >
            <OverlayScrollbarsComponent
                class="h-full outline-none dark:bg-dark-800/50"
            >
                <button
                    v-for="item in mySqlDataTypes"
                    :key="item.name"
                    class="group flex w-full justify-between px-2 py-1.5 text-xs font-bold hover:dark:bg-cyan-950 focus:dark:bg-cyan-950"
                    type="button"
                >
                    <span
                        class="w-full truncate text-left dark:text-slate-500 group-hover:dark:text-cyan-500 group-focus:dark:text-cyan-500"
                        >{{ item.name }}</span
                    >
                    <span
                        class="w-full truncate dark:text-slate-700 group-hover:dark:text-cyan-700 group-focus:dark:text-cyan-700"
                        >{{ item.description }}</span
                    >
                </button>
            </OverlayScrollbarsComponent>
        </div>
    </div>
</template>
