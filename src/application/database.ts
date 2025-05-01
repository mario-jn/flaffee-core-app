import * as employee from '../schema/employee';
import * as order from '../schema/order';
import * as orderItem from '../schema/orderItem';
import * as permission from '../schema/permission';
import * as product from '../schema/product';
import * as productItem from '../schema/productItem';
import * as role from '../schema/role';
import * as rolePermission from '../schema/rolePermission';
import config from './config';
import { drizzle } from 'drizzle-orm/node-postgres';

export const database = drizzle({
    connection: `postgres://${config.database.user}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.name}`,
    casing: 'snake_case',
    schema: {
        ...employee,
        ...order,
        ...orderItem,
        ...permission,
        ...product,
        ...productItem,
        ...role,
        ...rolePermission,
    },
});
