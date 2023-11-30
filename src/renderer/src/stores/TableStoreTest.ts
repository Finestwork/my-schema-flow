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
                        type: 'INTEGER',
                        isNull: false,
                        length: '150',
                        keyConstraint: 'PK',
                    },
                    {
                        name: 'name',
                        type: 'VARCHAR',
                        isNull: false,
                        length: '150',
                        keyConstraint: '',
                    },
                    {
                        name: 'created_at',
                        type: 'DATE',
                        isNull: false,
                        length: '',
                        keyConstraint: '',
                    },
                    {
                        name: 'guess',
                        type: 'INTEGER',
                        isNull: false,
                        length: '',
                        keyConstraint: '',
                    },
                    {
                        name: 'id',
                        type: 'INTEGER',
                        isNull: false,
                        length: '150',
                        keyConstraint: 'PK',
                    },
                    {
                        name: 'name',
                        type: 'VARCHAR',
                        isNull: false,
                        length: '150',
                        keyConstraint: '',
                    },
                    {
                        name: 'created_at',
                        type: 'DATE',
                        isNull: false,
                        length: '',
                        keyConstraint: '',
                    },
                    {
                        name: 'guess',
                        type: 'INTEGER',
                        isNull: false,
                        length: '',
                        keyConstraint: '',
                    },
                    {
                        name: 'id',
                        type: 'INTEGER',
                        isNull: false,
                        length: '150',
                        keyConstraint: 'PK',
                    },
                    {
                        name: 'name',
                        type: 'VARCHAR',
                        isNull: false,
                        length: '150',
                        keyConstraint: '',
                    },
                    {
                        name: 'created_at',
                        type: 'DATE',
                        isNull: false,
                        length: '',
                        keyConstraint: '',
                    },
                    {
                        name: 'guess',
                        type: 'INTEGER',
                        isNull: false,
                        length: '',
                        keyConstraint: '',
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
