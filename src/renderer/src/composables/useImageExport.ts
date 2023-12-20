import { exportAsImage as exportImage } from '@utilities/ExportHelper';
import { useVueFlow } from '@vue-flow/core';
import type { TExportTypes } from '@utilities/ExportHelper';

export function useImageExport() {
    const { getNodes, vueFlowRef } = useVueFlow();
    const exportAsImage = (type: TExportTypes) => {
        const TransformPane: HTMLElement = vueFlowRef.value.querySelector(
            '.vue-flow__transformationpane',
        );
        exportImage(type, TransformPane, getNodes.value);
    };

    return {
        exportAsImage,
    };
}
