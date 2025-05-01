import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { rolePermission } from './rolePermission';
import { timestamps } from './timestamp';

export const permission = pgTable('permission', {
    id: serial().primaryKey(),
    name: varchar().notNull(),
    ...timestamps,
});

export const permissionRelations = relations(permission, ({ many }) => ({
    rolePermission: many(rolePermission),
}));
