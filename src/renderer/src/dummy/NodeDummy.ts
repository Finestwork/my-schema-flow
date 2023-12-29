import { v4 as uuidv4 } from 'uuid';

export default {
    customers: {
        id: uuidv4(),
        name: 'customers',
        columns: [
            {
                name: 'customer_id',
                type: 'INTEGER',
                isNull: false,
                keyConstraint: 'PK',
            },
            {
                name: 'first_name',
                type: 'VARCHAR',
                isNull: false,
                length: '255',
                keyConstraint: '',
            },
            {
                name: 'last_name',
                type: 'VARCHAR',
                isNull: false,
                length: '255',
                keyConstraint: '',
            },
            {
                name: 'email',
                type: 'VARCHAR',
                isNull: false,
                length: '255',
                keyConstraint: '',
            },
            {
                name: 'phone_number',
                type: 'VARCHAR',
                isNull: false,
                length: '20',
                keyConstraint: '',
            },
            {
                name: 'address',
                type: 'VARCHAR',
                isNull: false,
                length: '255',
                keyConstraint: '',
            },
            {
                name: 'city',
                type: 'VARCHAR',
                isNull: false,
                length: '255',
                keyConstraint: '',
            },
            {
                name: 'state',
                type: 'VARCHAR',
                isNull: false,
                length: '255',
                keyConstraint: '',
            },
            {
                name: 'zip_code',
                type: 'VARCHAR',
                isNull: false,
                length: '20',
                keyConstraint: '',
            },
        ],
    },
    products: {
        id: uuidv4(),
        name: 'products',
        columns: [
            {
                name: 'product_id',
                type: 'INTEGER',
                isNull: false,
                keyConstraint: 'PK',
            },
            {
                name: 'product_name',
                type: 'VARCHAR',
                isNull: false,
                length: '255',
                keyConstraint: '',
            },
            {
                name: 'description',
                type: 'TEXT',
                isNull: false,
                keyConstraint: '',
            },
            {
                name: 'price',
                type: 'DECIMAL(10,2)',
                isNull: false,
                keyConstraint: '',
            },
            {
                name: 'in_stock_quantity',
                type: 'INTEGER',
                isNull: false,
                keyConstraint: '',
            },
            {
                name: 'category_id',
                type: 'INTEGER',
                isNull: false,
                keyConstraint: 'FK',
            },
            {
                name: 'supplier_id',
                type: 'INTEGER',
                isNull: false,
                keyConstraint: 'FK',
            },
        ],
    },
   
};
