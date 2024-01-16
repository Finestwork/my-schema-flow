<script setup lang="ts">
import VPanelActionButton from '@components/Base/Buttons/VPanelActionButton.vue';
import VAlert from '@components/Base/Alerts/VAlert.vue';
import VAlertList from '@components/Base/Alerts/VAlertList.vue';
import PanelBackButton from '@components/Shared/Buttons/PanelBackButton.vue';
import PanelFormIndexAttribute from '@components/Shared/Forms/PanelFormIndexAttribute.vue';
import PanelFormIndexType from '@components/Shared/Forms/PanelFormIndexType.vue';
import { useCanvasStore } from '@stores/Canvas';
import { nextTick, ref } from 'vue';
import { validateIndex } from '@utilities/FormTableHelper';

const { activeColumnIndex } = defineModels<{
    activeColumnIndex: number;
}>();
const canvasStore = useCanvasStore();
const ActiveNodeIndexArr = canvasStore.currentActiveNode.data.table.indexes;
const attribute = ref(ActiveNodeIndexArr[activeColumnIndex.value].column);
const indexType = ref(ActiveNodeIndexArr[activeColumnIndex.value].type);
const errors = ref<Array<string>>([]);
const isSuccessfullyCreated = ref(false);

const onClickAddIndex = async () => {
    isSuccessfullyCreated.value = false;
    const IndexObject = {
        column: attribute.value,
        type: indexType.value,
    };
    const Columns = canvasStore.currentActiveNode.data.table.columns.map(
        (column) => column.name,
    );
    errors.value = validateIndex(IndexObject, Columns);
    if (errors.value.length !== 0) return;

    //
    ActiveNodeIndexArr[activeColumnIndex.value] = Object.assign(
        {},
        IndexObject,
    );
    await nextTick();
    isSuccessfullyCreated.value = true;
};
</script>
<template>
    <div class="pb-2">
        <PanelBackButton class="mb-4 mt-2" @click="activeColumnIndex = -1" />
        <VAlert v-if="isSuccessfullyCreated" class="mb-2">
            Yeheeeey! You have successfully updated the index!
        </VAlert>
        <VAlertList
            v-if="errors.length !== 0"
            :items="errors"
            type="danger"
            class="mb-2"
        />
        <PanelFormIndexAttribute v-model="attribute" class="mb-2" />
        <PanelFormIndexType v-model="indexType" />
        <VPanelActionButton class="mt-4" @click="onClickAddIndex">
            <template #text>Add Index</template>
        </VPanelActionButton>
    </div>
</template>
