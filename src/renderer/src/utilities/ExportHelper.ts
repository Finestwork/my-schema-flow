import { createLinkElement } from '@utilities/DownloadHelper';
import { toPng, toJpeg, toSvg } from 'html-to-image';
import { getRectOfNodes, getTransformForBounds } from '@vue-flow/core';
import type { GraphNode } from '@vue-flow/core';

export type TSupportedTypes = string | 'png' | 'jpg' | 'svg';

/**
 * Export the given graph nodes to the specified type.
 */
export const exportTo = async (
    type: TSupportedTypes = 'png',
    wrapper: HTMLElement,
    nodes: GraphNode[],
) => {
    if (type.trim() === '') return;

    const nodesBounds = getRectOfNodes(nodes);
    const transform = getTransformForBounds(
        nodesBounds,
        nodesBounds.width,
        nodesBounds.height,
        0.5,
        2,
    );
    const PngOptions = {
        backgroundColor: '#0c0e1c',
        width: nodesBounds.width,
        height: nodesBounds.height,
        style: {
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.zoom})`,
        },
    };

    let imageData = '';
    switch (type) {
        case 'png':
            imageData = await toPng(wrapper, PngOptions);
            break;
        case 'svg':
            imageData = await toSvg(wrapper, PngOptions);
            break;
        case 'jpg':
            imageData = await toJpeg(wrapper, PngOptions);
            break;
    }

    createLinkElement(imageData, `diagram.${type}`);
};
