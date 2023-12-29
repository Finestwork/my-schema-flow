import type { TEdge, TNode, TTableColumn } from '@stores/Canvas';
import { createLinkElement } from '@utilities/DownloadHelper';
import OpenAI from "openai";

const client = new OpenAI({"apiKey": "api_key_here", "dangerouslyAllowBrowser": true});

const exportSQL = async (nodes: Array<TNode>, edges: Array<TEdge>) => {
  const Errors: Array<string> = [];

  // Iterate over the edges to access relationships
  nodes.forEach((node) => {
    const Columns = node.data.table.columns;

    Columns.forEach((column: TTableColumn) => {
      Errors.push(
        `${column.name}  ${column.type}(${column.length})  ${column.keyConstraint} ${
          column.isNull ? 'NULL' : 'NOT NULL'
        }`
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



  const assistant =await   client.beta.assistants.retrieve("asst_cKEXQK4zcyrva1uxhoYqmld3")
  const thread = await client.beta.threads.create();
  const message = await client.beta.threads.messages.create(
      thread.id,
      {
        role: "user",
        content: Errors.toString(),
      }
    );
    const run = await client.beta.threads.runs.create(
      thread.id,
      { 
        assistant_id: assistant.id,
      }
    );

   let runn = await client.beta.threads.runs.retrieve(thread.id, run.id);
   while (runn.status !== "completed") {
      await new Promise((r) => setTimeout(r, 500));
      runn = await client.beta.threads.runs.retrieve(thread.id, run.id);
    }
    const messages = await client.beta.threads.messages.list(thread.id);
    let data = "data:text/plain;," +messages.data[0].content[0].text.value
    console.log(data)
    createLinkElement(data, "schema.sql")

    return ""
 

  return Error;
};

export default exportSQL;
