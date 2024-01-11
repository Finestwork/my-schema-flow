import { isObject, isArray } from 'lodash';
import {
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
        if (Results.length === 0) {
            return Results;
        }

        const LastResult = Results[Results.length - 1]; // Get the last item, could be an array or object

        // If array of objects, return the last item
        if (isArray(LastResult)) {
            return LastResult;
        }

        // If the last item is from the ResultSetHeader
        if (isObject(LastResult)) {
            // Single object
            if (Object.keys(LastResult).includes('fieldCount')) {
                return LastResult;
            }

            // Array of objects
            return Results;
        }

        return LastResult;
    }

    return Results;
};
