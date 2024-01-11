import {
    OkPacket,
    ProcedureCallPacket,
    ResultSetHeader,
    RowDataPacket,
} from 'mysql2/typings/mysql/lib/protocol/packets';

export type TQueryResult =
    | ResultSetHeader
    | ResultSetHeader[]
    | RowDataPacket[]
    | RowDataPacket[][]
    | ProcedureCallPacket;

export const getLastResultFromQuery = (queryResult: TQueryResult) => {
    // Desired results are always at 0 because index 1 is a buffer array
    const Results = queryResult[0];

    if (Array.isArray(Results)) {
        const LastResult = Results[Results.length - 1]; // Get the last item, could be an array or object
        const ObjectKey = Object.keys(LastResult)[0];
        const IsArrayOfObjects =
            ObjectKey === 'Database' || ObjectKey.includes('Tables_in_'); // Check if the last item is an array of objects

        // If the last item of the array is an array of objects, do not get the last item
        if (IsArrayOfObjects) {
            return Results;
        }

        return LastResult;
    }

    return Results;
};
