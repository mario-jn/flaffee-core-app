import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { role } from './role';
import { order } from './order';
import { timestamps } from './timestamp';

export const employee = pgTable('employee', {
    id: varchar({ length: 16 }).primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    ...timestamps,
    roleId: integer().references(() => role.id),
});

export const employeeRelations = relations(employee, ({ one, many }) => ({
    role: one(role, { fields: [employee.roleId], references: [role.id] }),
    order: many(order),
}));
