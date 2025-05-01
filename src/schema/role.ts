import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { employee } from './employee';
import { rolePermission } from './rolePermission';
import { timestamps } from './timestamp';

export const role = pgTable('role', {
    id: serial().primaryKey(),
    name: varchar().notNull(),
    ...timestamps,
});

export const roleRelations = relations(role, ({ many }) => ({
    employee: many(employee),
    rolePermission: many(rolePermission),
}));
