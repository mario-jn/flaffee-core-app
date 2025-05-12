import { InsertPermission, SelectPermission } from './permission.model';
import { permissions } from '../schema/permissions';
import { database } from '../application/database';
import {and, count, eq, sql} from 'drizzle-orm';
import {resources} from "../schema/resources";

export class PermissionRepository {
    static async create(permission: InsertPermission): Promise<SelectPermission> {
        const [createdPermission] = await database
            .insert(permissions)
            .values(permission)
            .returning();
        return createdPermission;
    }

    static async findAll(): Promise<SelectPermission[]> {
        return database.select().from(permissions);
    }

    static async findById(id: number): Promise<SelectPermission> {
        const [result] = await database.select().from(permissions).where(eq(permissions.id, id));
        return result;
    }

    static async existsById(id: number): Promise<boolean> {
        const [result] = await database
            .select({ exists: sql<number>`1` })
            .from(permissions)
            .where(eq(permissions.id, id))
            .limit(1);
        return result.exists === 1;
    }

    static async existsByActionWithResource(action: string, resourceId: number): Promise<boolean> {
        const [result] = await database
            .select({exists: sql<number>`1`})
            .from(permissions)
            .where(and(eq(permissions.action, action), eq(resources.id, resourceId)))
            .limit(1);
        return result.exists === 1;
    }

    static async deleteById(id: number): Promise<SelectPermission> {
        const [deletedPermission] = await database.delete(permissions).where(eq(permissions.id, id)).returning();
        return deletedPermission;
    }
}
