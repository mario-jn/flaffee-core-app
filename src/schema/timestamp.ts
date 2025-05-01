import { timestamp } from 'drizzle-orm/pg-core';

export const timestamps = {
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true })
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
    deletedAt: timestamp({ withTimezone: true }),
};
