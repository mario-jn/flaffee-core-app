import { integer, pgEnum, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { employee } from './employee';
import { orderItem } from './orderItem';
import { timestamps } from './timestamp';

export const orderStatus = pgEnum('order_status', ['ongoing', 'done']);
export const orderType = pgEnum('order_type', ['dine_in', 'takeaway']);

export const order = pgTable('order', {
    id: serial().primaryKey(),
    status: orderStatus('status').notNull(),
    type: orderType('type').notNull(),
    price: integer().notNull(),
    customer: varchar().notNull(),
    ...timestamps,
    cashier: varchar().references(() => employee.id),
});

export const orderRelations = relations(order, ({ one, many }) => ({
    cashier: one(employee, { fields: [order.cashier], references: [employee.id] }),
    orderItem: many(orderItem),
}));
