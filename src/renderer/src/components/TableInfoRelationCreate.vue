<script setup lang="ts">
import BaseFormAutoComplete from '@components/BaseFormAutoComplete.vue';
import BaseFormAutoCompleteItem from '@components/BaseFormAutoCompleteItem.vue';
import { useTableStore } from '@stores/TableStore';
import { reactive } from 'vue';

const tableStore = useTableStore();
const states = reactive({
    attribute: '',
    showAttributeDropdown: false,
});
</script>

<template>
    <div>
        <BaseFormAutoComplete
            id="tableInfo"
            placeholder="Place table's attribute here"
            v-model="states.attribute"
            v-model:show-dropdown="states.showAttributeDropdown"
            :items="tableStore.getAttributesOfCurrentActiveNode"
        >
            <template #label>Attribute:</template>
            <template #float>
                <div class="scrollbar-slim">
                    <BaseFormAutoCompleteItem
                        v-for="attr in tableStore.getAttributesOfCurrentActiveNode"
                    >
                        {{ attr }}
                    </BaseFormAutoCompleteItem>
                </div>
            </template>
        </BaseFormAutoComplete>
        <!--        <TableInfoTextInput id="" placeholder="" v-model="states.references">-->
        <!--            <template #label>Referenced Table:</template>-->
        <!--        </TableInfoTextInput>-->
        <!--        <TableInfoTextInput id="" placeholder="" v-model="states.references">-->
        <!--            <template #label>Referenced table attribute:</template>-->
        <!--        </TableInfoTextInput>-->
    </div>
</template>
