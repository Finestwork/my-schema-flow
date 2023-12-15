<script setup lang="ts">
import PanelBackButton from '@components/Base/Buttons/PanelBackButton.vue';
import BaseColumnNameForm from '@components/Modules/TableInformation/Partials/BaseColumnNameForm.vue';
import { ref } from 'vue';

const { displayForm } = defineModels<{
    displayForm: boolean;
}>();
const columnName = ref('');
</script>
<template>
    <div class="mt-3">
        <PanelBackButton @click="displayForm = false" />
        <div class="mt-4">
            <BaseColumnNameForm v-model="columnName" />
        </div>
    </div>
</template>
