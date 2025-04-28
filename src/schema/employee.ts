import {integer, pgTable, timestamp, varchar} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
import {role} from "./role";
import {order} from "./order";

export const employee = pgTable("employee", {
    id: varchar("id", {length: 16}).primaryKey(),
    name: varchar("name", {length: 255}).notNull(),
    email: varchar("email", {length: 255}).notNull().unique(),
    password: varchar("password", {length: 255}).notNull(),
    roleId: integer('role_id').references(()=>role.id),
});

export const employeeRelations = relations(employee, ({ one, many }) => ({
    role: one(role, { fields: [employee.roleId], references: [role.id]}),
    order: many(order),
}));