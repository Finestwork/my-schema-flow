<script setup lang="ts">
import VAlertErrorList from '@components/Shared/Alerts/VAlertErrorList.vue';
import VAddIcon from '@components/Shared/Icons/VAddIcon.vue';
import BaseButton from '@components/TableInfo/Shared/BaseButton.vue';
import NoTableSelected from '@components/TableInfo/Shared/NoTableSelected.vue';
import RelationCreateForm from '@components/TableInfo/RelationSettings/Partials/RelationCreateForm.vue';
import RelationEditForm from '@components/TableInfo/RelationSettings/Partials/RelationEditForm.vue';
import RelationList from '@components/TableInfo/RelationSettings/Partials/RelationList.vue';
import VPanelSectionWrapper from '@components/Shared/Layouts/VPanelSectionWrapper.vue';
import { useSettingsStore } from '@stores/SettingsStore';
import { useTableRelation } from '@composables/useTableRelation';
import { computed, reactive, ref } from 'vue';

const settingsStore = useSettingsStore();
const showForm = ref(!settingsStore.hideTableRelationSettingsPanel);
const states = reactive({
    showCreateForm: false,
    errors: [] as string[],
});
const { tableStore, noActiveEdge } = useTableRelation();
const shouldDisplayCreateForm = computed(
    () => states.showCreateForm && noActiveEdge.value,
);
const shouldDisplayEditForm = computed(
    () => !states.showCreateForm && !noActiveEdge.value,
);
const shouldDisplayDefaultContent = computed(
    () => !states.showCreateForm && noActiveEdge.value,
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
    <VPanelSectionWrapper :show-form="showForm">
        <template #label>Table Relations</template>
        <div v-if="tableStore.hasActiveNode">
            <VAlertErrorList
                v-if="states.errors.length"
                class="mb-2 mt-2"
                color-scheme="danger"
                :items="states.errors"
            />
            <RelationCreateForm
                v-if="shouldDisplayCreateForm"
                @error="onError"
                @relationship-established="resetState"
                @go-back="resetState"
            />
            <RelationEditForm v-if="shouldDisplayEditForm" @error="onError" />
            <template v-if="shouldDisplayDefaultContent">
                <RelationList />
                <BaseButton @click="states.showCreateForm = true">
                    <template #icon>
                        <VAddIcon />
                    </template>
                    <template #text>Add Relation</template>
                </BaseButton>
            </template>
        </div>
        <NoTableSelected v-else />
    </VPanelSectionWrapper>
</template>
