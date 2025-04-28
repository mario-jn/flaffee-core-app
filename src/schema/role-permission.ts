import {integer, pgTable, primaryKey} from "drizzle-orm/pg-core"
import {relations} from "drizzle-orm"
import {role} from "./role"
import {permission} from "./permission"

export const rolePermission = pgTable('role_permission', {
    roleId: integer('role_id').references(()=> role.id),
    permissionId: integer('permission_id').references(()=> permission.id),
}, (t) => [primaryKey({columns: [t.roleId, t.permissionId]})]);

export const rolePermissionRelations = relations(rolePermission, ({one}) => ({
    role: one(role, {fields: [rolePermission.roleId], references: [role.id]}),
    permission: one(permission, {fields: [rolePermission.permissionId], references: [permission.id]}),
}));
