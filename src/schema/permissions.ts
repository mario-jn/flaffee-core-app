import { integer, pgTable, serial, unique, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { rolePermissions } from './role-permissions';
import { timestamps } from './timestamp';
import { resources } from './resources';

export const permissions = pgTable(
    'permissions',
    {
        id: serial('id').primaryKey(),
        action: varchar('action', { length: 128 }).notNull(),
        resourceId: integer('resource_id').references(() => resources.id),
        ...timestamps,
    },
    (t) => [unique().on(t.action, t.resourceId)],
);

export const permissionRelations = relations(permissions, ({ one, many }) => ({
    rolePermissions: many(rolePermissions),
    resources: one(resources, { fields: [permissions.resourceId], references: [resources.id] }),
}));
