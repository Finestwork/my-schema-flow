import {
    createColumnScript,
    createTableRelationScript,
    sortSQLResultObject,
} from '@utilities/SQLHelper';
import type { TEdge, TNode } from '@stores/Canvas';

export const exportToSQL = (nodes: Array<TNode>, edges: Array<TEdge>) => {
    const SQLScript = nodes.map((node) => {
        const Columns = node.data.table.columns;
        let script = `CREATE TABLE ${node.data.table.name}(\n`;

        script += Columns.map(createColumnScript).join(',\n');
        const Relations = createTableRelationScript(node.id, edges);

        if (Relations.length !== 0) {
            script += ',\n'; // Add ',' to the last column and '\n' to create a new line
            script += Relations.join(',\n');
        }

        // remove the last comma
        script += '\n);\n\n';

        const ForeignRelationships: Array<string> = edges
            .filter((edge) => edge.targetNode.id === node.id)
            .map((edge) => edge.sourceNode.data.table.name);

        return {
            name: <string>node.data.table.name,
            script: script,
            foreignKeys: ForeignRelationships,
        };
    });

    return sortSQLResultObject(SQLScript)
        .map((item) => item.script)
        .join('\n');
};
