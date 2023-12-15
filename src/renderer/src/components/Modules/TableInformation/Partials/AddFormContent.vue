<script setup lang="ts">
import PanelBackButton from '@components/Shared/Buttons/PanelBackButton.vue';
import PanelFormColumnName from '@components/Shared/Forms/PanelFormColumnName.vue';
import PanelColumnTypeForm from '@components/Shared/Forms/PanelColumnTypeForm.vue';
import { ref } from 'vue';

const { displayForm } = defineModels<{
    displayForm: boolean;
}>();
const columnName = ref('');
const columnType = ref('');
</script>
<template>
    <div class="mt-3">
        <PanelBackButton @click="displayForm = false" />
        <div class="mt-4">
            <PanelFormColumnName v-model="columnName" class="mb-2" />
            <PanelColumnTypeForm v-model="columnType" />
        </div>
    </div>
</template>
