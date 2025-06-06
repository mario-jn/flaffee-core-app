import { InsertPermission, SelectPermission } from './permission.model';
import { permissions } from '../schema/permissions';
import {database, DrizzleDatabase, TransactionScope} from '../application/database';
import {and, count, eq, inArray, sql} from 'drizzle-orm';
import {resources} from "../schema/resources";

export class PermissionRepository {
    static async create(permission: InsertPermission, db: DrizzleDatabase | TransactionScope = database): Promise<SelectPermission> {
        const [createdPermission] = await db
            .insert(permissions)
            .values(permission)
            .returning();
        return createdPermission;
    }

    static async findAll(db: DrizzleDatabase | TransactionScope = database): Promise<SelectPermission[]> {
        return db.select().from(permissions);
    }

    static async findById(id: number, db: DrizzleDatabase | TransactionScope = database): Promise<SelectPermission> {
        const [result] = await db.select().from(permissions).where(eq(permissions.id, id));
        return result;
    }

    static async findByIds(ids: number[], db: DrizzleDatabase | TransactionScope = database): Promise<SelectPermission[]> {
        return db.select().from(permissions).where(inArray(permissions.id, ids));
    }

    static async existsById(id: number, db: DrizzleDatabase | TransactionScope = database): Promise<boolean> {
        const [result] = await db
            .select({ exists: sql<number>`1` })
            .from(permissions)
            .where(eq(permissions.id, id))
            .limit(1);
        return result.exists === 1;
    }

    static async existsByActionWithResource(action: string, resourceId: number, db: DrizzleDatabase | TransactionScope = database): Promise<boolean> {
        const [result] = await db
            .select({exists: sql<number>`1`})
            .from(permissions)
            .where(and(eq(permissions.action, action), eq(resources.id, resourceId)))
            .limit(1);
        return result.exists === 1;
    }

    static async deleteById(id: number, db: DrizzleDatabase | TransactionScope = database): Promise<SelectPermission> {
        const [deletedPermission] = await db.delete(permissions).where(eq(permissions.id, id)).returning();
        return deletedPermission;
    }
}
