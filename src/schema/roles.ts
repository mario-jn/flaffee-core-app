import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { rolePermissions } from './role-permissions';
import { timestamps } from './timestamp';
import { userRoles } from './user-roles';

export const roles = pgTable('roles', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 64 }).unique().notNull(),
    createdAt: timestamps.createdAt,
    updatedAt: timestamps.updatedAt,
});

export const roleRelations = relations(roles, ({ many }) => ({
    userRoles: many(userRoles),
    rolePermissions: many(rolePermissions),
}));
