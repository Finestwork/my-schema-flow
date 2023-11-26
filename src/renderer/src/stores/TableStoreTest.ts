export const TestElements = [
    {
        id: '1',
        type: 'custom',
        connectable: false,
        position: { x: 250, y: 5 },
        data: {
            table: {
                name: 'node 1',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isNull: false,
                        length: 0,
                        keyConstraint: 'PK',
                    },
                    {
                        name: 'student_id',
                        type: 'integer',
                        isNull: false,
                        length: 0,
                        keyConstraint: 'FK',
                    },
                    {
                        name: 'school_id',
                        type: 'integer',
                        isNull: false,
                        length: 0,
                        keyConstraint: 'FK',
                    },
                    {
                        name: 'first_name',
                        type: 'varchar',
                        isNull: true,
                        length: 255,
                        keyConstraint: null,
                    },
                    {
                        name: 'middle_name',
                        type: 'varchar',
                        isNull: true,
                        length: 255,
                        keyConstraint: null,
                    },
                    {
                        name: 'last_name',
                        type: 'varchar',
                        isNull: true,
                        length: 255,
                        keyConstraint: null,
                    },
                    {
                        name: 'age',
                        type: 'integer',
                        isNull: true,
                        length: null,
                        keyConstraint: null,
                    },
                ],
            },
        },
    },
    {
        id: '2',
        type: 'custom',
        connectable: false,
        position: { x: 400, y: 400 },
        data: {
            table: {
                name: 'node 2',
                columns: [],
            },
        },
    },
    {
        id: '3',
        type: 'custom',
        connectable: false,
        position: { x: 400, y: 600 },
        data: {
            table: {
                name: 'node 3',
                columns: [],
            },
        },
    },
];

export const TestEdges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e1-3', source: '1', target: '3' },
];
