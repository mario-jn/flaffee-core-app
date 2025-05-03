import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { rolePermission } from './rolePermission';
import { timestamps } from './timestamp';
import { userRole } from "./userRole";

export const role = pgTable('role', {
    id: serial().primaryKey(),
    name: varchar().notNull(),
    ...timestamps,
});

export const roleRelations = relations(role, ({ many }) => ({
    userRole: many(userRole),
    rolePermission: many(rolePermission),
}));
