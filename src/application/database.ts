import * as auditTrails from '../schema/audit-trails';
import * as employees from '../schema/employees';
import * as orderItems from '../schema/order-items';
import * as orders from '../schema/orders';
import * as permissions from '../schema/permissions';
import * as productItems from '../schema/product-items';
import * as products from '../schema/products';
import * as resources from '../schema/resources';
import * as rolePermissions from '../schema/role-permissions';
import * as roles from '../schema/roles';
import * as sessions from '../schema/sessions';
import * as userRoles from '../schema/user-roles';
import config from './config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { logger } from './logger';

export const database = drizzle({
    connection: `postgres://${config.database.user}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.name}`,
    casing: 'snake_case',
    schema: {
        ...auditTrails,
        ...employees,
        ...orders,
        ...orderItems,
        ...permissions,
        ...products,
        ...productItems,
        ...resources,
        ...roles,
        ...rolePermissions,
        ...sessions,
        ...userRoles,
    },
    logger: {
        logQuery: (query: string, params: unknown[]) => {
            logger.debug?.(
                `(Query) ${query} (Param) ${JSON.stringify(params)}`,
                'Drizzle',
            );
        },
    },
});
