import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { roles } from './roles';
import { permissions } from './permissions';

export const rolePermissions = pgTable(
    'role_permissions',
    {
        roleId: integer().notNull().references(() => roles.id),
        permissionId: integer().notNull().references(() => permissions.id),
    },
    (t) => [primaryKey({ columns: [t.roleId, t.permissionId] })],
);

export const rolePermissionRelations = relations(rolePermissions, ({ one }) => ({
    role: one(roles, { fields: [rolePermissions.roleId], references: [roles.id] }),
    permission: one(permissions, {
        fields: [rolePermissions.permissionId],
        references: [permissions.id],
    }),
}));
