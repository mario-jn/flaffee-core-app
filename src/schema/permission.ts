import {pgTable, serial, varchar} from "drizzle-orm/pg-core"
import {relations} from "drizzle-orm"
import {rolePermission} from "./rolePermission"
import {timestamp} from "drizzle-orm/pg-core";

export const permission = pgTable('permission', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow(),
    deletedAt: timestamp('deleted_at').defaultNow(),
})

export const permissionRelations = relations(permission, ({many}) => ({
    rolePermission: many(rolePermission),
}));