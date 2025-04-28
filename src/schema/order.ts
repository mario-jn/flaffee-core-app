import {integer, pgEnum, pgTable, serial, timestamp, varchar} from "drizzle-orm/pg-core"
import {relations} from "drizzle-orm";
import {employee} from "./employee";
import {orderItem} from "./order-item";

export const orderStatus = pgEnum('order_status', ['ongoing', 'done']);
export const orderType = pgEnum('order_type', ['dine_in', 'takeaway'])

export const order = pgTable('order', {
    id: serial('id').primaryKey(),
    status: orderStatus('status').notNull(),
    value: integer('value').notNull(),
    type: orderType('type').notNull(),
    customer: varchar('customer').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    cashier: varchar('cashier').references(()=>employee.id),
});

export const orderRelations = relations(order, ({one, many}) => ({
    cashier: one(employee, {fields: [order.cashier], references: [employee.id]}),
    orderItem: many(orderItem),
}));