import {jsonb, pgTable, timestamp, varchar} from "drizzle-orm/pg-core";
import {employee} from "./employee";
import {relations} from "drizzle-orm";

export const session = pgTable('session', {
    id: varchar('id', {length: 32}),
    userId: varchar('user_id', {length: 32}).references(()=>employee.id),
    deviceInfo: jsonb('device_info'),
    ipAddress: varchar('ip_address', {length: 64}),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const sessionRelations = relations(session, ({one}) => ({
    user: one(employee, {fields: [session.userId], references: [employee.id]}),
}));