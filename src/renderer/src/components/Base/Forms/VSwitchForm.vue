<script setup lang="ts">
import VSwitchCheckbox from '@components/Base/Forms/VSwitchCheckbox.vue';

type TProps = {
    for: string;
    id: string;
};

const { modelValue } = defineModels<{
    modelValue: boolean | Array<string>;
}>();
const props = defineProps<TProps>();
</script>

<template>
    <div>
        <VSwitchCheckbox :id="props.id" v-model="modelValue" :for="props.for">
            <template #label>
                <slot name="label"></slot>
            </template>
        </VSwitchCheckbox>
        <p class="mt-2 text-xs font-semibold text-slate-700">
            <slot name="helper"></slot>
        </p>
    </div>
</template>
