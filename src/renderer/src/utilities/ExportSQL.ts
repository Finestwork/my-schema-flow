import type { TEdge, TNode, TTableColumn } from '@stores/Canvas';
import { createLinkElement } from '@utilities/DownloadHelper';
import OpenAI from 'openai';
import { MessageContentText } from 'openai/resources/beta/threads/messages/messages';

const client = new OpenAI({
    apiKey: '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',
    dangerouslyAllowBrowser: true,
});

const exportSQL = async (nodes: Array<TNode>, edges: Array<TEdge>) => {
    const Errors: Array<string> = [];

    // Iterate over the edges to access relationships
    nodes.forEach((node) => {
        const Columns = node.data.table.columns;

        Columns.forEach((column: TTableColumn) => {
            Errors.push(
                `${column.name}  ${column.type}(${column.length})  ${
                    column.keyConstraint
                } ${column.isNull ? 'NULL' : 'NOT NULL'}`,
            );
        });
    });

    edges.forEach((edge) => {
        const relationship = {
            referencingColumn: edge.data.referencing.column,
            referencedColumn: edge.data.referenced.column,
        };
        Errors.push(JSON.stringify(relationship));
    });

    const assistant = await client.beta.assistants.retrieve(
        'asst_cKEXQK4zcyrva1uxhoYqmld3',
    );
    const thread = await client.beta.threads.create();
    await client.beta.threads.messages.create(thread.id, {
        role: 'user',
        content: Errors.toString(),
    });
    const run = await client.beta.threads.runs.create(thread.id, {
        assistant_id: assistant.id,
    });

    let runn = await client.beta.threads.runs.retrieve(thread.id, run.id);
    while (runn.status !== 'completed') {
        await new Promise((r) => setTimeout(r, 500));
        runn = await client.beta.threads.runs.retrieve(thread.id, run.id);
    }
    const messages = await client.beta.threads.messages.list(thread.id);
    let data = '';
    if (messages.data[0].content[0].type === 'text') {
        const textContent = messages.data[0].content[0] as MessageContentText;
        data = 'data:text/plain;,' + textContent.text.value;
    }
    createLinkElement(data, 'schema.sql');

    return '';
};

export default exportSQL;
