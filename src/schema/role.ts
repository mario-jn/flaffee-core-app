import {pgTable, serial, varchar} from "drizzle-orm/pg-core"
import {relations} from "drizzle-orm"
import {employee} from "./employee"
import {rolePermission} from "./role-permission"

export const role = pgTable('role', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
});

export const roleRelations = relations(role, ({ many }) => ({
    employee: many(employee),
    rolePermission: many(rolePermission)
}));