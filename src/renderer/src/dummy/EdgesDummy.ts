export default [
    {
        source: {
            table: 'categories',
            column: 'category_id',
        },
        target: {
            table: 'products',
            column: 'category_id',
        },
        cardinality: 'one-to-many',
    },
    {
        source: {
            table: 'suppliers',
            column: 'supplier_id',
        },
        target: {
            table: 'products',
            column: 'supplier_id',
        },
        cardinality: 'one-to-many',
    },
    {
        source: {
            table: 'customers',
            column: 'customer_id',
        },
        target: {
            table: 'orders',
            column: 'customer_id',
        },
        cardinality: 'one-to-many',
    },
    {
        source: {
            table: 'orders',
            column: 'order_id',
        },
        target: {
            table: 'shipments',
            column: 'order_id',
        },
        cardinality: 'one-to-many',
    },
    {
        source: {
            table: 'orders',
            column: 'order_id',
        },
        target: {
            table: 'payments',
            column: 'order_id',
        },
        cardinality: 'one-to-many',
    },
    {
        source: {
            table: 'products',
            column: 'product_id',
        },
        target: {
            table: 'product_reviews',
            column: 'product_id',
        },
        cardinality: 'one-to-many',
    },
    {
        source: {
            table: 'customers',
            column: 'customer_id',
        },
        target: {
            table: 'product_reviews',
            column: 'customer_id',
        },
        cardinality: 'one-to-many',
    },
    {
        source: {
            table: 'employees',
            column: 'employee_id',
        },
        target: {
            table: 'employee_roles',
            column: 'employee_id',
        },
        cardinality: 'one-to-many',
    },
];
