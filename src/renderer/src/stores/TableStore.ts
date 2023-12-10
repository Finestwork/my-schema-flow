import { getConnectedNodes } from '@utilities/NodeEdgeHelper';
import type { Edge, Node } from '@vue-flow/core';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import { TestEdges, TestElements } from '@renderer/stores/dummy/TableStoreTest';

export type TTableColumnCreation = {
    name: string;
    type: string;
    isNull: boolean;
    length: '';
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

export type TEdgeDataObject = {
    id: string;
    column: string;
    table: string;
};
export type TEdgeData = {
    referenced: TEdgeDataObject;
    referencing: TEdgeDataObject;
};

export type TElement = Node & { data: TTableData };
export type TEdge = Edge & { data: TTableData };

export const useTableStore = defineStore('tableStore', {
    state() {
        return {
            elements: TestElements as TElement[],
            edges: TestEdges as TEdge[],
            currentActiveNode: {} as TElement | Record<string, never>,
            currentActiveEdges: [] as TEdge[],
            currentActiveEdgeIndex: -1,
            isCreatingTable: false,
        };
    },
    actions: {
        createNewElement(posX: number, posY: number) {
            const NewElementObj = {
                id: uuidv4(),
                type: 'custom',
                connectable: false,
                position: { x: posX, y: posY },
                data: {
                    table: {
                        name: `table_${this.elements.length + 1}`,
                        columns: [],
                    },
                    state: {
                        isActive: false,
                    },
                    style: {
                        opacity: 1,
                    },
                },
            };
            return NewElementObj;
        },
        addNewEdge(
            referenced: { id: string; column: string; table: string },
            referencing: { id: string; column: string; table: string },
        ) {
            const Edge = {
                id: uuidv4(),
                source: referenced.id,
                target: referencing.id,
                data: {
                    referenced: {
                        id: referenced.id,
                        column: referenced.column,
                        table: referenced.table,
                    },
                    referencing: {
                        id: referencing.id,
                        column: referencing.column,
                        table: referencing.table,
                    },
                },
            };
            this.edges.push(Edge);
        },
        updateNewEdge(
            edgeId: string,
            referenced: { id: string; column: string; table: string },
            referencing: { id: string; column: string; table: string },
        ) {
            const NewEdgeObject = {
                id: uuidv4(),
                source: referenced.id,
                target: referencing.id,
                data: {
                    referenced: {
                        id: referenced.id,
                        column: referenced.column,
                        table: referenced.table,
                    },
                    referencing: {
                        id: referencing.id,
                        column: referencing.column,
                        table: referencing.table,
                    },
                },
            };
            const Index = this.edges.findIndex((edge) => edge.id === edgeId);
            if (Index === -1) return;
            this.edges.splice(Index, 1);
            this.edges.push(NewEdgeObject);
        },
        deleteEdge(edgeId: string) {
            const Index = this.edges.findIndex((edge) => edge.id === edgeId);
            if (Index === -1) return;
            this.edges.splice(Index, 1);
        },
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
            this.currentActiveNode.data.table.columns = [...Columns, Object.assign({}, ColumnData)];
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
        highlightNodes() {
            const Nodes = getConnectedNodes(this.currentActiveNode, this.edges);
            Nodes.related.forEach((edge) => {
                const Edge = this.edges.find((element) => element.id === edge.id);
                Edge.style = {
                    stroke: '#3b82f6',
                };
                Edge.animated = true;
                Edge.sourceNode.data.state.isActive = true;
                Edge.targetNode.data.state.isActive = true;
            });
            Nodes.unrelated.forEach((edge) => {
                const Edge = this.edges.find((element) => element.id === edge.id);
                Edge.style = {
                    opacity: 0.5,
                };
                const SourceId = Edge.sourceNode.id;
                const TargetId = Edge.targetNode.id;
                const SourceIndex = Nodes.related.findIndex(
                    (edge) => edge.sourceNode.id === SourceId || edge.targetNode.id === SourceId,
                );
                const TargetIndex = Nodes.related.findIndex(
                    (edge) => edge.sourceNode.id === TargetId || edge.targetNode.id === TargetId,
                );
                if (TargetIndex === -1) {
                    Edge.targetNode.data.style.opacity = 0.5;
                }
                if (SourceIndex === -1) {
                    Edge.sourceNode.data.style.opacity = 0.5;
                }
            });
        },
        unHighlightNodes() {
            const Nodes = getConnectedNodes(this.currentActiveNode, this.edges);
            Nodes.related.forEach((edge) => {
                const Edge = this.edges.find((element) => element.id === edge.id);
                Edge.style = {};
                Edge.animated = false;
                Edge.sourceNode.data.state.isActive = false;
                Edge.targetNode.data.state.isActive = false;
            });
            Nodes.unrelated.forEach((edge) => {
                const Edge = this.edges.find((element) => element.id === edge.id);
                Edge.style = {
                    opacity: 1,
                };
                Edge.sourceNode.data.style.opacity = 1;
                Edge.targetNode.data.style.opacity = 1;
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
