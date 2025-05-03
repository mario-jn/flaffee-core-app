import {integer, pgTable, primaryKey, varchar} from "drizzle-orm/pg-core";
import {employee} from "./employee";
import {role} from "./role";
import {relations} from "drizzle-orm";

export const userRole = pgTable('user_role', {
   userId: varchar('user_id', {length: 32}).references(()=> employee.id),
   roleId: integer('role_id').references(()=> role.id),
}, (t) => [primaryKey({columns: [t.userId, t.roleId]})]);

export const userRoleRelations = relations(userRole, ({one, many}) => ({
    user: one(employee, {fields: [userRole.userId], references:[employee.id]}),
    role: one(role, {fields: [userRole.roleId], references:[role.id]}),
}));