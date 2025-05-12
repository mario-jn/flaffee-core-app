import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { roles } from './roles';
import { orders } from './orders';
import { timestamps } from './timestamp';
import { auditTrails } from './audit-trails';

export const employees = pgTable('employees', {
    id: varchar({ length: 32 }).primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    ...timestamps,
});

export const employeeRelations = relations(employees, ({ many }) => ({
    roles: many(roles),
    orders: many(orders),
    auditTrails: many(auditTrails),
}));
