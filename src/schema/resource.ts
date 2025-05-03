import {pgTable, serial, varchar} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
import {permission} from "./permission";

export const resource = pgTable('resource', {
    id: serial('id').primaryKey(),
    name: varchar('name', {length: 128}),
    description: varchar('description'),
});

export const resourceRelations = relations(resource, ({many}) => ({
   permission: many(permission),
}));