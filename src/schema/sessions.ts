import { jsonb, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { employees } from './employees';
import { relations } from 'drizzle-orm';

export const sessions = pgTable('sessions', {
    id: varchar('id', { length: 32 }),
    userId: varchar('user_id', { length: 32 }).references(() => employees.id),
    deviceInfo: jsonb('device_info'),
    ipAddress: varchar('ip_address', { length: 64 }),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true })
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
});

export const sessionRelations = relations(sessions, ({ one }) => ({
    users: one(employees, { fields: [sessions.userId], references: [employees.id] }),
}));
