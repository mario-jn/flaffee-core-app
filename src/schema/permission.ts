import {integer, pgTable, serial, unique, varchar} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { rolePermission } from './rolePermission';
import { timestamps } from './timestamp';
import {resource} from "./resource";

export const permission = pgTable('permission', {
    id: serial('id').primaryKey(),
    action: varchar('action', {length: 128}).notNull(),
    resourceId: integer('resource_id').references(() => resource.id),
    ...timestamps,
}, (t) => [unique().on(t.action, t.resourceId)]);

export const permissionRelations = relations(permission, ({ one, many }) => ({
    rolePermission: many(rolePermission),
    resource: one(resource, {fields: [permission.resourceId], references: [resource.id]}),
}));
