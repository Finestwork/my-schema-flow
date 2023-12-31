import { useCanvasStore } from '@stores/Canvas';
import { computed, ref, watch } from 'vue';

export function useColumnData() {
    const canvasStore = useCanvasStore();
    const columnName = ref(canvasStore.getCurrentActiveColumnData?.name ?? '');
    const columnOriginalColumnName = ref(
        canvasStore.getCurrentActiveColumnData?.name ?? '',
    );
    const columnType = ref(canvasStore.getCurrentActiveColumnData?.type ?? '');
    const columnLength = ref(
        canvasStore.getCurrentActiveColumnData?.length ?? '',
    );
    const columnKeyConstraint = ref(
        canvasStore.getCurrentActiveColumnData?.keyConstraint ?? '',
    );
    const columnIsNull = ref(
        canvasStore.getCurrentActiveColumnData?.isNull ?? false,
    );
    const getColumnData = computed(() => {
        return {
            name: columnName.value,
            originalColumnName: columnOriginalColumnName.value,
            type: columnType.value,
            isNull: columnIsNull.value,
            length: columnLength.value,
            keyConstraint: columnKeyConstraint.value,
        };
    });
    const fullResetData = () => {
        columnName.value = '';
        columnOriginalColumnName.value = '';
        columnType.value = '';
        columnLength.value = '';
        columnKeyConstraint.value = '';
        columnIsNull.value = false;
    };
    watch(
        () => canvasStore.currentNodeActiveColumnIndex,
        () => {
            columnName.value =
                canvasStore.getCurrentActiveColumnData?.name ?? '';
            columnOriginalColumnName.value =
                canvasStore.getCurrentActiveColumnData?.name ?? '';
            columnType.value =
                canvasStore.getCurrentActiveColumnData?.type ?? '';
            columnLength.value =
                canvasStore.getCurrentActiveColumnData?.length ?? '';
            columnKeyConstraint.value =
                canvasStore.getCurrentActiveColumnData?.keyConstraint ?? '';
            columnIsNull.value =
                canvasStore.getCurrentActiveColumnData?.isNull ?? false;
        },
    );

    return {
        getColumnData,
        columnName,
        columnOriginalColumnName,
        columnType,
        columnLength,
        columnKeyConstraint,
        columnIsNull,
        fullResetData,
    };
}
