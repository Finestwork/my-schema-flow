import { mySqlDataTypes } from '@renderer/database/MySqlDataTypes';
import type { Ref } from 'vue';
import { computed } from 'vue';

export const getAutocomplete = (searchTerm: Ref<string>) => {
    const contents = computed(() => {
        return mySqlDataTypes
            .filter((type) => type.name.toLowerCase().includes(searchTerm.value.toLowerCase()))
            .map((type) => ({
                name: type.name,
                description: type.description === '' ? 'No description' : type.description,
            }));
    });

    return {
        contents,
    };
};
