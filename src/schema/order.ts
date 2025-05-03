import { integer, pgEnum, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { employee } from './employee';
import { orderItem } from './orderItem';
import { timestamps } from './timestamp';

export const orderStatus = pgEnum('order_status', ['ongoing', 'done']);
export const orderType = pgEnum('order_type', ['dine_in', 'takeaway']);

export const order = pgTable('order', {
    id: serial('id').primaryKey(),
    status: orderStatus('status').notNull(),
    type: orderType('type').notNull(),
    price: integer('price').notNull(),
    customer: varchar('customer', {length: 64}).notNull(),
    ...timestamps,
    cashier: varchar('cashier', {length: 32}).references(() => employee.id),
});

export const orderRelations = relations(order, ({ one, many }) => ({
    cashier: one(employee, { fields: [order.cashier], references: [employee.id] }),
    orderItem: many(orderItem),
}));
