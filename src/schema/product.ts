import { pgEnum, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { productItem } from './productItem';
import { timestamps } from './timestamp';

export const productType = pgEnum('product_type', ['beverage', 'food']);
export const productCategory = pgEnum('product_category', ['coffee', 'tea', 'snack', 'main_course']);

export const product = pgTable('product', {
    id: serial().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    type: productType('type').notNull(),
    category: productCategory('category').notNull(),
    ...timestamps,
});

export const productRelations = relations(product, ({ many }) => ({
    productItem: many(productItem),
}));
