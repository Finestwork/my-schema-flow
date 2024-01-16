<script setup lang="ts">
import VPanelActionButton from '@components/Base/Buttons/VPanelActionButton.vue';
import VAlert from '@components/Base/Alerts/VAlert.vue';
import PanelBackButton from '@components/Shared/Buttons/PanelBackButton.vue';
import PanelFormIndexAttribute from '@components/Shared/Forms/PanelFormIndexAttribute.vue';
import PanelFormIndexType from '@components/Shared/Forms/PanelFormIndexType.vue';
import { useCanvasStore } from '@stores/Canvas';
import { nextTick, ref } from 'vue';

const emits = defineEmits<{
    (e: 'goBack'): void;
}>();
const attribute = ref('');
const indexType = ref('non-unique');
const isSuccessfullyCreated = ref(false);
const canvasStore = useCanvasStore();

const onClickAddIndex = async () => {
    isSuccessfullyCreated.value = false;
    const IndexObject = {
        attribute: attribute.value,
        indexType: indexType.value,
    };
    canvasStore.currentActiveNode.data.table.indexes.push(IndexObject);
    await nextTick();
    attribute.value = '';
    indexType.value = '';
    isSuccessfullyCreated.value = true;
};
</script>
<template>
    <div class="pb-2">
        <PanelBackButton class="mb-4 mt-2" @click="emits('goBack')" />
        <VAlert v-if="isSuccessfullyCreated" class="mb-2">
            Yeheeeey! You have successfully created an index!
        </VAlert>
        <PanelFormIndexAttribute v-model="attribute" class="mb-2" />
        <PanelFormIndexType v-model="indexType" />
        <VPanelActionButton class="mt-4" @click="onClickAddIndex">
            <template #text>Add Index</template>
        </VPanelActionButton>
    </div>
</template>
