import { integer, pgEnum, pgTable, serial } from 'drizzle-orm/pg-core';
import { products } from './products';
import { relations } from 'drizzle-orm';
import { orderItems } from './order-items';
import { timestamps } from './timestamp';

export const productSize = pgEnum('product_size', ['regular', 'large', 'extra_large']);
export const productVariant = pgEnum('product_variant', ['regular', 'hot', 'ice']);

export const productItems = pgTable('product_items', {
    id: serial().primaryKey(),
    variant: productVariant('variant').notNull(),
    size: productSize('size').notNull(),
    price: integer().notNull(),
    ...timestamps,
    productId: integer().references(() => products.id),
});

export const productItemRelations = relations(productItems, ({ one, many }) => ({
    products: one(products, { fields: [productItems.productId], references: [products.id] }),
    orderItems: many(orderItems),
}));
