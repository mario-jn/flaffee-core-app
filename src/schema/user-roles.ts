import { integer, pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core';
import { employees } from './employees';
import { roles } from './roles';
import { relations } from 'drizzle-orm';

export const userRoles = pgTable(
    'user_roles',
    {
        userId: varchar('user_id', { length: 32 }).notNull().references(() => employees.id),
        roleId: integer('role_id').notNull().references(() => roles.id),
    },
    (t) => [primaryKey({ columns: [t.userId, t.roleId] })],
);

export const userRoleRelations = relations(userRoles, ({ one }) => ({
    user: one(employees, { fields: [userRoles.userId], references: [employees.id] }),
    role: one(roles, { fields: [userRoles.roleId], references: [roles.id] }),
}));
