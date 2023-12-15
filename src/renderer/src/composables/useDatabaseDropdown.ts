import { mySqlDataTypes } from '@utilities/DatabaseHelper';
import { mySqlDataTypes } from '@utilities/DatabaseHelper';
import { computed, ref } from 'vue';
import type { Ref } from 'vue';
import type { OverlayScrollbarsComponentRef } from 'overlayscrollbars-vue';

export function useDatabaseDropdown(
    dropdownBtn: Ref<Array<HTMLButtonElement>>,
    scrollbar: Ref<OverlayScrollbarsComponentRef>,
    currentValue: Ref<string>,
) {
    const showDropdown = ref(false);
    const currentIndex = ref(0);
    const searchTerm = ref('');
    const getMysqlDatTypes = computed(() => {
        return mySqlDataTypes.filter((db) =>
            db.name.toLowerCase().includes(searchTerm.value.toLowerCase()),
        );
    });
    let timeoutId = 0;

    const updateActiveIndex = () => {
        const NewIndex = getMysqlDatTypes.value.findIndex((db) =>
            db.name.toLowerCase().includes(currentValue.value.toLowerCase()),
        );
        if (NewIndex !== -1) {
            currentIndex.value = NewIndex;
        }
    };
    const updateScrollPosition = () => {
        const CurrentElement = dropdownBtn.value[currentIndex.value];
        scrollbar.value.osInstance().elements().viewport.scrollTop =
            CurrentElement.offsetTop;
    };
    const navigateUp = () => {
        if (currentIndex.value <= 0) {
            currentIndex.value = dropdownBtn.value.length - 1;
        } else {
            currentIndex.value--;
        }
        updateScrollPosition();
    };

    const navigateDown = () => {
        if (currentIndex.value === dropdownBtn.value.length - 1) {
            currentIndex.value = 0;
        } else {
            currentIndex.value++;
        }
        updateScrollPosition();
    };

    const onKeyDownNavigateDropdown = (e: KeyboardEvent) => {
        if (e.key === 'Backspace') {
            if (searchTerm.value === '') return;
            showDropdown.value = false;

            // Scrollbar doesn't work well with v-for, it needs to be hidden then show again to make it work
            clearTimeout(timeoutId);
            timeoutId = window.setTimeout(() => {
                showDropdown.value = true;
                updateActiveIndex();
            }, 50);
        }

        if (e.key === 'ArrowUp') {
            if (dropdownBtn.value.length === 1) return;
            navigateUp();
            currentValue.value =
                getMysqlDatTypes.value[currentIndex.value].name;
            return;
        }

        if (e.key === 'ArrowDown') {
            if (dropdownBtn.value.length === 1) return;
            navigateDown();
            currentValue.value =
                getMysqlDatTypes.value[currentIndex.value].name;
            return;
        }

        if (e.key === 'Enter') {
            const CurrentDatabaseName =
                getMysqlDatTypes.value[currentIndex.value];

            if (!CurrentDatabaseName) {
                searchTerm.value = currentValue.value;
            } else {
                currentValue.value = CurrentDatabaseName.name;
                searchTerm.value = CurrentDatabaseName.name;
            }

            showDropdown.value = false;
            (e.target as HTMLInputElement).blur();
        }
    };

    return {
        showDropdown,
        searchTerm,
        currentIndex,
        getMysqlDatTypes,
        updateActiveIndex,
        navigateUp,
        navigateDown,
        updateScrollPosition,
        onKeyDownNavigateDropdown,
    };
}
