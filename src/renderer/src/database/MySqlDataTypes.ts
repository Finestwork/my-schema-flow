import { stubTrue } from 'lodash';

export type TMysqlDataType = {
    name: string;
    hasSize: boolean;
    description: string;
};

export const stringDataTypes: TMysqlDataType[] = [
    {
        name: 'CHAR',
        description:
            'A FIXED length string (can contain letters, numbers, and special characters). The size parameter specifies the column length in characters - can be from 0 to 255. Default is 1',
        hasSize: true,
    },
    {
        name: 'VARCHAR',
        description:
            'A VARIABLE length string (can contain letters, numbers, and special characters). The size parameter specifies the maximum column length in characters - can be from 0 to 65535',
        hasSize: true,
    },
    {
        name: 'BINARY',
        description:
            'Equal to CHAR(), but stores binary byte strings. The size parameter specifies the column length in bytes. Default is 1',
        hasSize: true,
    },
    {
        name: 'VARBINARY',
        description:
            'Equal to VARCHAR(), but stores binary byte strings. The size parameter specifies the maximum column length in bytes.',
        hasSize: true,
    },
    {
        name: 'TINYBLOB',
        description: 'For BLOBs (Binary Large OBjects). Max length: 255 bytes',
        hasSize: false,
    },
    {
        name: 'TINYTEXT',
        description: 'Holds a string with a maximum length of 255 characters',
        hasSize: false,
    },
    {
        name: 'TEXT',
        description: 'Holds a string with a maximum length of 65,535 bytes',
        hasSize: true,
    },
    {
        name: 'BLOB',
        description: 'For BLOBs (Binary Large OBjects). Holds up to 65,535 bytes of data',
        hasSize: true,
    },
    {
        name: 'MEDIUMTEXT',
        description: 'Holds a string with a maximum length of 16,777,215 characters',
        hasSize: false,
    },
    {
        name: 'MEDIUMBLOB',
        description: 'For BLOBs (Binary Large OBjects). Holds up to 16,777,215 bytes of data',
        hasSize: false,
    },
    {
        name: 'LONGTEXT',
        description: 'Holds a string with a maximum length of 4,294,967,295 characters',
        hasSize: false,
    },
    {
        name: 'LONGBLOB',
        description: 'For BLOBs (Binary Large OBjects). Holds up to 4,294,967,295 bytes of data',
        hasSize: false,
    },
    {
        name: 'ENUM',
        description:
            'A string object that can have only one value, chosen from a list of possible values. You can list up to 65535 values in an ENUM list. If a value is inserted that is not in the list, a blank value will be inserted. The values are sorted in the order you enter them',
        hasSize: false,
    },
    {
        name: 'SET',
        description:
            'A string object that can have 0 or more values, chosen from a list of possible values. You can list up to 64 values in a SET list',
        hasSize: false,
    },
];

export const numericDataTypes: TMysqlDataType[] = [
    {
        name: 'BIT',
        description:
            'A bit-value type. The number of bits per value is specified in size. The size parameter can hold a value from 1 to 64. The default value for size is 1.',
        hasSize: true,
    },
    {
        name: 'TINYINT',
        description:
            'A very small integer. Signed range is from -128 to 127. Unsigned range is from 0 to 255. The size parameter specifies the maximum display width (which is 255)',
        hasSize: true,
    },
    {
        name: 'BOOL',
        description: 'Zero is considered as false, nonzero values are considered as true.',
        hasSize: false,
    },
    {
        name: 'BOOLEAN',
        description: 'Equal to BOOL',
        hasSize: false,
    },
    {
        name: 'SMALLINT',
        description:
            'A small integer. Signed range is from -32768 to 32767. Unsigned range is from 0 to 65535. The size parameter specifies the maximum display width (which is 255)',
        hasSize: true,
    },
    {
        name: 'MEDIUMINT',
        description:
            'A medium integer. Signed range is from -8388608 to 8388607. Unsigned range is from 0 to 16777215. The size parameter specifies the maximum display width (which is 255)',
        hasSize: true,
    },
    {
        name: 'INT',
        description:
            'A medium integer. Signed range is from -2147483648 to 2147483647. Unsigned range is from 0 to 4294967295. The size parameter specifies the maximum display width (which is 255)',
        hasSize: true,
    },
    {
        name: 'INTEGER',
        description: 'Equal to INT(size)',
        hasSize: true,
    },
    {
        name: 'BIGINT',
        description:
            'A large integer. Signed range is from -9223372036854775808 to 9223372036854775807. Unsigned range is from 0 to 18446744073709551615. The size parameter specifies the maximum display width (which is 255)',
        hasSize: true,
    },
    {
        name: 'FLOAT',
        description:
            'A floating point number. The total number of digits is specified in size. The number of digits after the decimal point is specified in the d parameter. This syntax is deprecated in MySQL 8.0.17, and it will be removed in future MySQL versions',
        hasSize: true,
    },
    {
        name: 'DOUBLE',
        description:
            'A normal-size floating point number. The total number of digits is specified in size. The number of digits after the decimal point is specified in the d parameter',
        hasSize: true,
    },
    {
        name: 'DOUBLE PRECISION',
        description: '',
        hasSize: false,
    },
    {
        name: 'DECIMAL',
        description:
            'An exact fixed-point number. The total number of digits is specified in size. The number of digits after the decimal point is specified in the d parameter. The maximum number for size is 65. The maximum number for d is 30. The default value for size is 10. The default value for d is 0.',
        hasSize: true,
    },
    {
        name: 'DEC',
        description: 'Equal to DECIMAL(size)',
        hasSize: true,
    },
];

export const timeDataTypes: TMysqlDataType[] = [
    {
        name: 'DATE',
        description:
            "A date. Format: YYYY-MM-DD. The supported range is from '1000-01-01' to '9999-12-31'",
        hasSize: false,
    },
    {
        name: 'DATETIME',
        description:
            "A date and time combination. Format: YYYY-MM-DD hh:mm:ss. The supported range is from '1000-01-01 00:00:00' to '9999-12-31 23:59:59'. Adding DEFAULT and ON UPDATE in the column definition to get automatic initialization and updating to the current date and time",
        hasSize: false,
    },
    {
        name: 'TIMESTAMP',
        description:
            "A timestamp. TIMESTAMP values are stored as the number of seconds since the Unix epoch ('1970-01-01 00:00:00' UTC). Format: YYYY-MM-DD hh:mm:ss. The supported range is from '1970-01-01 00:00:01' UTC to '2038-01-09 03:14:07' UTC. Automatic initialization and updating to the current date and time can be specified using DEFAULT CURRENT_TIMESTAMP and ON UPDATE CURRENT_TIMESTAMP in the column definition",
        hasSize: false,
    },
    {
        name: 'TIME',
        description:
            "A time. Format: hh:mm:ss. The supported range is from '-838:59:59' to '838:59:59'",
        hasSize: false,
    },
    {
        name: 'YEAR',
        description:
            'A year in four-digit format. Values allowed in four-digit format: 1901 to 2155, and 0000. MySQL 8.0 does not support year in two-digit format.',
        hasSize: false,
    },
];
export const mySqlDataTypes: TMysqlDataType[] = [
    ...stringDataTypes,
    ...numericDataTypes,
    ...timeDataTypes,
];
