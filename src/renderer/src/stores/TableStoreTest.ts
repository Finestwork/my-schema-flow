const StudentInformationTable = {
    name: 'student_information',
    columns: [
        {
            name: 'student_id',
            type: 'INTEGER',
            isNull: false,
            length: '150',
            keyConstraint: 'PK',
        },
        {
            name: 'student_name',
            type: 'VARCHAR',
            isNull: false,
            length: '150',
            keyConstraint: '',
        },
        {
            name: 'grade_level',
            type: 'INTEGER',
            isNull: false,
            length: '',
            keyConstraint: '',
        },
        {
            name: 'section',
            type: 'VARCHAR',
            isNull: false,
            length: '',
            keyConstraint: '',
        },
        {
            name: 'room_number',
            type: 'VARCHAR',
            isNull: false,
            length: '',
            keyConstraint: '',
        },
    ],
};
const AcademicInformationTable = {
    name: 'academic_information',
    columns: [
        {
            name: 'id',
            type: 'INTEGER',
            isNull: false,
            length: '',
            keyConstraint: 'PK',
        },
        {
            name: 'course_code',
            type: 'VARCHAR',
            isNull: false,
            length: '150',
            keyConstraint: '',
        },
        {
            name: 'course_title',
            type: 'VARCHAR',
            isNull: false,
            length: '150',
            keyConstraint: '',
        },
        {
            name: 'teacher_name',
            type: 'VARCHAR',
            isNull: false,
            length: '150',
            keyConstraint: '',
        },
        {
            name: 'room_number',
            type: 'VARCHAR',
            isNull: false,
            length: '150',
            keyConstraint: '',
        },
        {
            name: 'class_schedule',
            type: 'DATETIME',
            isNull: false,
            length: '150',
            keyConstraint: '',
        },
        {
            name: 'grades',
            type: 'INTEGER',
            isNull: false,
            length: '150',
            keyConstraint: '',
        },
    ],
};
const EnrollInformationTable = {
    name: 'enrollment_information',
    columns: [
        {
            name: 'id',
            type: 'INTEGER',
            isNull: false,
            length: '150',
            keyConstraint: 'PK',
        },
        {
            name: 'completion_status',
            type: 'VARCHAR',
            isNull: false,
            length: '',
            keyConstraint: '',
        },
        {
            name: 'progress',
            type: 'INTEGER',
            isNull: false,
            length: '',
            keyConstraint: '',
        },
    ],
};

export const TestElements = [
    {
        id: '1',
        type: 'custom',
        connectable: false,
        position: { x: 250, y: 5 },
        data: {
            table: StudentInformationTable,
        },
    },
    {
        id: '2',
        type: 'custom',
        connectable: false,
        position: { x: 600, y: 5 },
        data: {
            table: AcademicInformationTable,
        },
    },
    {
        id: '3',
        type: 'custom',
        connectable: false,
        position: { x: 900, y: 5 },
        data: {
            table: EnrollInformationTable,
        },
    },
];

export const TestEdges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e1-3', source: '1', target: '3' },
];
