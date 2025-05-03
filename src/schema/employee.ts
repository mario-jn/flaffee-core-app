import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { role } from './role';
import { order } from './order';
import { timestamps } from './timestamp';
import {auditTrail} from "./auditTrail";

export const employee = pgTable('employee', {
    id: varchar({ length: 32 }).primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    ...timestamps,
});

export const employeeRelations = relations(employee, ({ one, many }) => ({
    role: many(role),
    order: many(order),
    auditTrail: many(auditTrail),
}));
