import {integer, jsonb, pgTable, serial, varchar} from "drizzle-orm/pg-core";
import {employee} from "./employee";
import {timestamps} from "./timestamp";
import {relations} from "drizzle-orm";

export const auditTrail = pgTable('audit_trail', {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', {length: 16}).references(()=>employee.id),
    action: varchar('action', {length: 128}),  // from permission.action
    resourceName: varchar('resource_name', {length: 128}),  // from resource.name
    entityId: integer('entity_id'), // e.g: productItem.id or role.id
    oldValue: jsonb('old_value'),
    newValue: jsonb('new_value'),
    ...timestamps,
});

export const auditTrailRelations = relations(auditTrail, ({one}) => ({
    user: one(employee, {fields: [auditTrail.userId], references: [employee.id]}),
}));