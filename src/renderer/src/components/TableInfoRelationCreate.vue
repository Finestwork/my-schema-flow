<script setup lang="ts">
import TableInfoRelationAutoComplete from '@components/TableInfoRelationAutoComplete.vue';
import { useTableStore } from '@stores/TableStore';
import { computed, reactive } from 'vue';

const tableStore = useTableStore();
const states = reactive({
    attribute: '',
    attributeSearchTerm: '',
});
const getAttributes = computed(() =>
    tableStore.getAttributesOfCurrentActiveNode.filter((attr) =>
        attr.toLowerCase().includes(states.attributeSearchTerm.toLowerCase()),
    ),
);
</script>

<template>
    <div>
        <TableInfoRelationAutoComplete
            id="tableInfo"
            placeholder="Place table's attribute here"
            v-model="states.attribute"
            v-model:search-term="states.attributeSearchTerm"
            :items="getAttributes"
        >
            <template #label> Attribute: </template>
        </TableInfoRelationAutoComplete>
    </div>
</template>
