import { integer, pgEnum, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { employees } from './employees';
import { orderItems } from './order-items';
import { timestamps } from './timestamp';

export const orderStatus = pgEnum('order_status', ['ongoing', 'done']);
export const orderType = pgEnum('order_type', ['dine_in', 'takeaway']);

export const orders = pgTable('orders', {
    id: serial('id').primaryKey(),
    status: orderStatus('status').notNull(),
    type: orderType('type').notNull(),
    price: integer('price').notNull(),
    customer: varchar('customer', { length: 64 }).notNull(),
    ...timestamps,
    cashier: varchar('cashier', { length: 32 }).references(() => employees.id),
});

export const orderRelations = relations(orders, ({ one, many }) => ({
    cashiers: one(employees, { fields: [orders.cashier], references: [employees.id] }),
    orderItems: many(orderItems),
}));
