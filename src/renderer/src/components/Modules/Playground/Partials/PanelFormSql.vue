<script setup lang="ts">
import VPlaygroundTextInput from '@components/Base/Forms/VPlaygroundTextInput.vue';

const { modelValue } = defineModels<{
    modelValue: string;
}>();

</script>

<template>
    <VPlaygroundTextInput
        id="playgroundSql"
        v-model="modelValue"
        placeholder="SQL: "
        :no-whitespace="false"
    >
        <template #label>Sql Statement:</template>
    </VPlaygroundTextInput>
</template>
