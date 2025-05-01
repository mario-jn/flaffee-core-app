import {integer, pgEnum, pgTable, serial} from "drizzle-orm/pg-core";
import {product} from "./product";
import {relations} from "drizzle-orm";
import {orderItem} from "./orderItem";
import {timestamp} from "drizzle-orm/pg-core";

export const productSize = pgEnum("product_size", ["regular", "large", "extra_large"]);
export const productVariant = pgEnum("product_variant", ["regular", "hot", "ice"]);

export const productItem = pgTable('product_item', {
    id: serial('id').primaryKey(),
    variant: productVariant("variant").notNull(),
    size: productSize("size").notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow(),
    deletedAt: timestamp('deleted_at').defaultNow(),
    productId: integer("product_id").references(()=>product.id),
});

export const productItemRelations = relations(productItem, ({one, many}) => ({
    product: one(product, {fields: [productItem.productId], references: [product.id]}),
    orderItem: many(orderItem),
}));