import {integer, pgTable, serial, varchar} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
import {order} from "./order";
import {productItem} from "./product-item";

export const orderItem = pgTable('order_item', {
    id: serial('id').primaryKey(),
    quantity: integer('quantity'),
    note: varchar('note'),
    orderId: integer('order_id').references(()=>order.id),
    productItemId: integer("product_item_id").references(()=>productItem.id),
});

export const orderItemRelations = relations(orderItem, ({one}) => ({
    order: one(order, {fields: [orderItem.orderId], references: [order.id]}),
    productItem: one(productItem, {fields:[orderItem.productItemId], references: [productItem.id]}),
}));