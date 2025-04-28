import {pgTable, serial, varchar} from "drizzle-orm/pg-core"
import {relations} from "drizzle-orm"
import {rolePermission} from "./role-permission"

export const permission = pgTable('permission', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
})

export const permissionRelations = relations(permission, ({many}) => ({
    rolePermission: many(rolePermission),
}));