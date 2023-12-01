import { TestElements } from '@stores/TableStoreTest';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import type { Edge, Node } from '@vue-flow/core';

export type TTableColumnCreation = {
    name: string;
    type: string;
    isNull: boolean;
    length: '' | null;
    keyConstraint: 'PK' | 'FK' | '';
};
export type TTableColumn = TTableColumnCreation & {
    id: number;
};

export type TTableData = {
    table: {
        name: string;
        columns: TTableColumn[];
    };
};

export const useTableStore = defineStore('tableStore', {
    state() {
        return {
            elements: TestElements as (Node & { data: TTableData })[],
            edges: [] as Edge[],
            currentActiveNode: {} as (Node & { data: TTableData }[]) | Record<string, never>,
        };
    },
    actions: {
        onActiveNodeCreateColumn(columnData: TTableColumnCreation) {
            const Columns = this.currentActiveNode.data.table.columns;
            const ColumnData = {
                id: uuidv4(),
                name: columnData.name,
                type: columnData.type,
                isNull: columnData.isNull,
                length: columnData.length,
                keyConstraint: columnData.keyConstraint,
            };
            Columns.push(Object.assign({}, ColumnData));
        },
        updateTableColumn(columnData: TTableColumnCreation, index: number) {
            const Columns = this.currentActiveNode.data.table.columns;
            const CurrentColumn = Columns[index];
            Columns[index] = Object.assign(CurrentColumn, {
                name: columnData.name,
                type: columnData.type,
                isNull: columnData.isNull,
                length: columnData.length,
                keyConstraint: columnData.keyConstraint,
            });
        },
    },
    getters: {
        hasActiveNode(state) {
            return Object.keys(state.currentActiveNode).length !== 0;
        },
        activeNodeHasColumns(state) {
            if (!this.hasActiveNode) {
                return false;
            }

            const Columns = state.currentActiveNode.data.table.columns;
            return Columns.length !== 0;
        },
        getAttributesOfCurrentActiveNode(state) {
            const Columns = state.currentActiveNode.data.table.columns;
            return Columns.map((column) => column.name);
        },
        getAllColumnNames(state) {
            return state.elements.map((element) => ({
                id: element.id,
                name: element.data.table.name,
            }));
        },
    },
});
