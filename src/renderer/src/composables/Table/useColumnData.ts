import { useCanvasStore } from '@stores/Canvas';
import { ref, watch } from 'vue';

export function useColumnData() {
    const canvasStore = useCanvasStore();
    const columnName = ref(canvasStore.getCurrentActiveColumnData?.name ?? '');
    const columnOriginalColumnName = ref(
        canvasStore.getCurrentActiveColumnData?.name ?? '',
    );
    const columnType = ref(canvasStore.getCurrentActiveColumnData?.type ?? '');
    const columnKeyConstraint = ref(
        canvasStore.getCurrentActiveColumnData?.keyConstraint ?? '',
    );
    const columnIsNull = ref(
        canvasStore.getCurrentActiveColumnData?.isNull ?? false,
    );
    const columnIsUnique = ref(
        canvasStore.getCurrentActiveColumnData?.isNull ?? false,
    );
    const fullResetData = () => {
        columnName.value = '';
        columnOriginalColumnName.value = '';
        columnType.value = '';
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
            columnKeyConstraint.value =
                canvasStore.getCurrentActiveColumnData?.keyConstraint ?? '';
            columnIsNull.value =
                canvasStore.getCurrentActiveColumnData?.isNull ?? false;
            columnIsUnique.value =
                canvasStore.getCurrentActiveColumnData?.isUnique ?? false;
        },
    );

    return {
        columnName,
        columnOriginalColumnName,
        columnType,
        columnKeyConstraint,
        columnIsNull,
        columnIsUnique,
        fullResetData,
    };
}
