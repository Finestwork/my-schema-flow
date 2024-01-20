import { mySqlDataTypes } from '@utilities/DatabaseHelper';
import { computed, ref } from 'vue';

export function useSearchMySQLDataTypes() {
    const searchTerm = ref('');
    const getMysqlDataTypes = computed(() => {
        return mySqlDataTypes.filter((db) =>
            db.name.toLowerCase().includes(searchTerm.value.toLowerCase()),
        );
    });
    return {
        searchTerm,
        getMysqlDataTypes,
    };
}
