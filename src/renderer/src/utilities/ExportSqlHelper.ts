import { createLinkElement } from '@utilities/DownloadHelper';
import type { TEdge, TNode, TTableColumn } from '@stores/Canvas';

export const exportMySQL = (nodes: Array<TNode>, edges: Array<TEdge>) => {
    const sqlData: string[] = ['data:text/plain;charset=utf-8,'];

    nodes.map((node) => {
        const Columns = node.data.table.columns;
        sqlData.push(`CREATE TABLE ${node.data.table.name}(\n`);
        Columns.map((column: TTableColumn) => {
            sqlData.push(
                `${column.name}  ${column.type}${
                    column.length ? `(${column.length})` : ''
                }  ${column.keyConstraint === 'PK' ? 'PRIMARY KEY' : ''} ${
                    column.isNull ? 'NULL,\n' : 'NOT NULL,\n'
                }`,
            );
        });
        edges.map((edge) => {
            if (edge.target === node.id) {
                sqlData.push(
                    `FOREIGN KEY (${edge.data.referencing.column}) REFERENCES ${edge.sourceNode.data.table.name}(${edge.data.referenced.column}),\n`,
                );
            }
        });
        // remove the last comma
        sqlData[sqlData.length - 1] = sqlData[sqlData.length - 1].slice(0, -2);
        sqlData.push(');\n');
    });
    // exports the sql file
    createLinkElement(sqlData.join(''), `diagram.sql`);

    return '';
};

export default exportMySQL;
