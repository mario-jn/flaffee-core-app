import {integer, pgEnum, pgTable, serial, unique, varchar} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { rolePermissions } from './role-permissions';
import { timestamps } from './timestamp';
import { resources } from './resources';

export const permissionActionEnum = pgEnum('permission_action', ['create', 'read', 'delete']);

export const permissions = pgTable(
    'permissions',
    {
        id: serial('id').primaryKey(),
        action: permissionActionEnum('action').notNull(),
        resourceId: integer('resource_id').notNull().references(() => resources.id),
        createdAt: timestamps.createdAt,
        updatedAt: timestamps.updatedAt,
    },
    (t) => [unique().on(t.action, t.resourceId)],
);

export const permissionRelations = relations(permissions, ({ one, many }) => ({
    rolePermissions: many(rolePermissions),
    resource: one(resources, { fields: [permissions.resourceId], references: [resources.id] }),
}));
