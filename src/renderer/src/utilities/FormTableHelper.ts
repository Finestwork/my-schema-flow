import { isString, isEmpty } from 'lodash';
import type { TNode } from '@stores/CanvasStore';

export type TAddColumnForm = {
    name: string;
    type: string;
    length: string;
    keyConstraint: string;
};

export const validateColumns = (
    data: TAddColumnForm,
    currentNode: TNode,
): Array<string> => {
    const Errors = [];

    if (isEmpty(data.name)) {
        Errors.push('Column name cannot be empty.');
    }

    if (isEmpty(data.type)) {
        Errors.push('Column type cannot be empty.');
    }

    return Errors.map((error) => `• ${error}`);
};
