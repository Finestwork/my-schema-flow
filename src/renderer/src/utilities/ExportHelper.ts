import { createLinkElement } from '@utilities/DownloadHelper';
import { toPng, toJpeg, toSvg } from 'html-to-image';
import { getRectOfNodes, getTransformForBounds } from '@vue-flow/core';
import type { TNode } from '@stores/Canvas';

export type TExportTypes = 'png' | 'jpg' | 'svg';

export type TExportOptions = {
    bgColor: string;
};

/**
 * Export the given graph nodes to the specified type.
 */
export const exportAsImage = async (
    type: TExportTypes = 'png',
    wrapper: HTMLElement,
    nodes: Array<TNode>,
    options: TExportOptions | Record<string, never> = {},
) => {
    if (type.trim() === '') return;
    const DefaultOptions = Object.assign(
        {
            bgColor: '#090B10',
        },
        options,
    );

    const nodesBounds = getRectOfNodes(nodes);
    const transform = getTransformForBounds(
        nodesBounds,
        nodesBounds.width,
        nodesBounds.height,
        0.5,
        2,
    );
    const ImageOptions = {
        backgroundColor: DefaultOptions.bgColor,
        width: nodesBounds.width,
        height: nodesBounds.height,
        style: {
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.zoom})`,
        },
    };

    let imageData = '';
    switch (type) {
        case 'png':
            imageData = await toPng(wrapper, ImageOptions);
            break;
        case 'svg':
            imageData = await toSvg(wrapper, ImageOptions);
            break;
        case 'jpg':
            imageData = await toJpeg(wrapper, ImageOptions);
            break;
    }
    createLinkElement(imageData, `diagram.${type}`);
};
