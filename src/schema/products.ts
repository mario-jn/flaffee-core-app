import { pgEnum, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { productItems } from './product-items';
import { timestamps } from './timestamp';

export const productType = pgEnum('product_type', ['beverage', 'food']);
export const productCategory = pgEnum('product_category', ['coffee', 'non_coffee', 'snack', 'main_course']);

export const products = pgTable('products', {
    id: serial().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    type: productType('type').notNull(),
    image: text(),
    category: productCategory('category').notNull(),
    ...timestamps,
});

export const productRelations = relations(products, ({ many }) => ({
    productItems: many(productItems),
}));
