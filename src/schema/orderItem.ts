import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { order } from './order';
import { productItem } from './productItem';
import { timestamps } from './timestamp';

export const orderItem = pgTable('order_item', {
    id: serial().primaryKey(),
    quantity: integer(),
    note: varchar(),
    ...timestamps,
    orderId: integer().references(() => order.id),
    productItemId: integer().references(() => productItem.id),
});

export const orderItemRelations = relations(orderItem, ({ one }) => ({
    order: one(order, { fields: [orderItem.orderId], references: [order.id] }),
    productItem: one(productItem, {
        fields: [orderItem.productItemId],
        references: [productItem.id],
    }),
}));
