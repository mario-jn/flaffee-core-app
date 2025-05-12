import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { permissions } from './permissions';

export const resources = pgTable('resources', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 128 }),
    description: varchar('description'),
});

export const resourceRelations = relations(resources, ({ many }) => ({
    permissions: many(permissions),
}));
