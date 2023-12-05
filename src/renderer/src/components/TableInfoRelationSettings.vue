<script setup lang="ts">
import BaseAlertErrorList from '@components/BaseAlertErrorList.vue';
import IconAdd from '@components/IconAdd.vue';
import TableInfoBaseButton from '@components/TableInfoBaseButton.vue';
import TableInfoNoTableSelected from '@components/TableInfoNoTableSelected.vue';
import TableInfoRelationCreate from '@components/TableInfoRelationCreate.vue';
import TableInfoRelationEdit from '@components/TableInfoRelationEdit.vue';
import TableInfoRelationList from '@components/TableInfoRelationList.vue';
import TableInfoSectionWrapper from '@components/TableInfoSectionWrapper.vue';
import { useTableRelation } from '@composables/useTableRelation';
import { useSettingsStore } from '@stores/SettingsStore';
import { computed, reactive, ref } from 'vue';

const settingsStore = useSettingsStore();
const showForm = ref(!settingsStore.hideTableRelationSettingsPanel);
const states = reactive({
    showCreateForm: false,
    errors: [] as string[],
});
const { tableStore, noActiveEdge } = useTableRelation();
const shouldDisplayCreateForm = computed(() => states.showCreateForm && noActiveEdge.value);
const shouldDisplayEditForm = computed(() => !states.showCreateForm && !noActiveEdge.value);
const shouldDisplayDefaultContent = computed(() => !states.showCreateForm && noActiveEdge.value);
const onError = (errors) => {
    states.errors = errors;
};
const resetState = () => {
    states.errors = [];
    states.showCreateForm = false;
};
</script>

<template>
    <TableInfoSectionWrapper :show-form="showForm">
        <template #label>Table Relations</template>
        <div v-if="tableStore.hasActiveNode">
            <BaseAlertErrorList
                v-if="states.errors.length"
                class="mb-2 mt-2"
                color-scheme="danger"
                :items="states.errors"
            />
            <TableInfoRelationCreate
                v-if="shouldDisplayCreateForm"
                @error="onError"
                @relationship-established="resetState"
                @go-back="resetState"
            />
            <TableInfoRelationEdit v-if="shouldDisplayEditForm" @error="onError" />
            <template v-if="shouldDisplayDefaultContent">
                <TableInfoRelationList />
                <TableInfoBaseButton @click="states.showCreateForm = true">
                    <template #icon>
                        <IconAdd />
                    </template>
                    <template #text>Add Relation</template>
                </TableInfoBaseButton>
            </template>
        </div>
        <TableInfoNoTableSelected v-else />
    </TableInfoSectionWrapper>
</template>
