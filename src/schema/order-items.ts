import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { orders } from './orders';
import { productItems } from './product-items';
import { timestamps } from './timestamp';

export const orderItems = pgTable('order_items', {
    id: serial().primaryKey(),
    quantity: integer(),
    note: varchar(),
    ...timestamps,
    orderId: integer().references(() => orders.id),
    productItemId: integer().references(() => productItems.id),
});

export const orderItemRelations = relations(orderItems, ({ one }) => ({
    orders: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
    productItems: one(productItems, {
        fields: [orderItems.productItemId],
        references: [productItems.id],
    }),
}));
