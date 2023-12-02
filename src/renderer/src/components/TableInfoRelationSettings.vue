<script setup lang="ts">
import IconAdd from '@components/IconAdd.vue';
import BaseAlertErrorList from '@components/BaseAlertErrorList.vue';
import TableInfoSectionWrapper from '@components/TableInfoSectionWrapper.vue';
import TableInfoNoTableSelected from '@components/TableInfoNoTableSelected.vue';
import TableInfoBaseButton from '@components/TableInfoBaseButton.vue';
import TableInfoRelationCreate from '@components/TableInfoRelationCreate.vue';
import TableInfoRelationEdit from '@components/TableInfoRelationEdit.vue';
import TableInfoRelationList from '@components/TableInfoRelationList.vue';
import { useSettingsStore } from '@stores/SettingsStore';
import { useTableStore } from '@stores/TableStore';
import { ref, reactive, computed } from 'vue';

const tableStore = useTableStore();
const settingsStore = useSettingsStore();
const showForm = ref(!settingsStore.hideTableRelationSettingsPanel);
const states = reactive({
    showCreateForm: false,
    errors: [] as string[],
});
const shouldDisplayCreateForm = computed(
    () => states.showCreateForm && Object.keys(tableStore.currentActiveEdge).length === 0,
);
const shouldDisplayEditForm = computed(
    () => !states.showCreateForm && Object.keys(tableStore.currentActiveEdge).length !== 0,
);
const shouldDisplayDefaultContent = computed(
    () => !states.showCreateForm && Object.keys(tableStore.currentActiveEdge).length === 0,
);
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
                class="mb-2 mt-2"
                color-scheme="danger"
                v-if="states.errors.length"
                :items="states.errors"
            />
            <TableInfoRelationCreate
                v-if="shouldDisplayCreateForm"
                @error="onError"
                @relationship-established="resetState"
                @go-back="resetState"
            />
            <TableInfoRelationEdit v-if="shouldDisplayEditForm" />
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
