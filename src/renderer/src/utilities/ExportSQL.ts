import type { TEdge, TNode, TTableColumn} from '@stores/Canvas';
import { useTableRelationList } from '@composables/Table/useTableRelationList';
import { ref } from 'vue';
import type {TRelationList} from '@composables/Table/useTableRelationList';


const exportSQL = (nodes: Array<TNode>, edges: Array<TEdge>): Array<string> => {
    const Errors: Array<string> = [];

  
    // Iterate over the edges to access relationships

    nodes.forEach((node) => {
        const TableName = node.data.table.name;
        const Columns = node.data.table.columns;

        Columns.forEach((column: TTableColumn) => {
            Errors.push(`${column.name}  ${column.type}(${column.length})  ${column.keyConstraint} ${
                column.isNull ? 'NULL' : 'NOT NULL'
            }`);
        });
    });

 


    edges.forEach((edge) => {
        const relationship = { 
                referencingColumn: edge.data.referencing.column,
                referencedColumn: edge.data.referenced.column
            }
            Errors.push(JSON.stringify(relationship))
        });
        console.log(Errors) 
    return Errors.map((error) => `• ${error}`);
};


export default exportSQL;