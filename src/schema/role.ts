import {pgTable, serial, varchar} from "drizzle-orm/pg-core"
import {relations} from "drizzle-orm"
import {employee} from "./employee"
import {rolePermission} from "./rolePermission"
import {timestamp} from "drizzle-orm/pg-core";

export const role = pgTable('role', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow(),
    deletedAt: timestamp('deleted_at').defaultNow(),
});

export const roleRelations = relations(role, ({ many }) => ({
    employee: many(employee),
    rolePermission: many(rolePermission)
}));