import {boolean, pgEnum, pgTable, serial, varchar} from "drizzle-orm/pg-core"
import {relations} from "drizzle-orm";
import {productItem} from "./productItem";
import {timestamp} from "drizzle-orm/pg-core";

export const productType = pgEnum("product_type", ["beverage", "food"]);
export const productCategory = pgEnum("product_category", ["coffee", "tea", "milk", "snack", "main_course"]);

export const product = pgTable("product", {
    id: serial("id").primaryKey(),
    name: varchar("name", {length: 255}),
    type: productType("type").notNull(),
    category: productCategory("category").notNull(),
    isHidden: boolean("is_hidden").default(false),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow(),
    deletedAt: timestamp('deleted_at').defaultNow(),
});

export const productRelations = relations(product, ({many}) => ({
    productItem: many(productItem),
}));