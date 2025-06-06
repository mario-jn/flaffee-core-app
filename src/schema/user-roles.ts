import { integer, pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core';
import { employees } from './employees';
import { roles } from './roles';
import { relations } from 'drizzle-orm';

export const userRoles = pgTable(
    'user_roles',
    {
        userId: varchar('user_id', { length: 32 }).references(() => employees.id),
        roleId: integer('role_id').references(() => roles.id),
    },
    (t) => [primaryKey({ columns: [t.userId, t.roleId] })],
);

export const userRoleRelations = relations(userRoles, ({ one }) => ({
    users: one(employees, { fields: [userRoles.userId], references: [employees.id] }),
    roles: one(roles, { fields: [userRoles.roleId], references: [roles.id] }),
}));
