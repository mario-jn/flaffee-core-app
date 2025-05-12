import { integer, jsonb, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { employees } from './employees';
import { timestamps } from './timestamp';
import { relations } from 'drizzle-orm';

export const auditTrails = pgTable('audit_trails', {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 16 }).references(() => employees.id),
    action: varchar('action', { length: 128 }), // from permission.action
    resourceName: varchar('resource_name', { length: 128 }), // from resource.name
    entityId: integer('entity_id'), // e.g: productItem.id or role.id
    oldValue: jsonb('old_value'),
    newValue: jsonb('new_value'),
    ...timestamps,
});

export const auditTrailRelations = relations(auditTrails, ({ one }) => ({
    users: one(employees, { fields: [auditTrails.userId], references: [employees.id] }),
}));
