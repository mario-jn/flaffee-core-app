import { InsertResource, SelectResource } from './resource.model';
import {database, DrizzleDatabase, TransactionScope} from '../application/database';
import { resources } from '../schema/resources';
import { eq, sql } from 'drizzle-orm';

export class ResourceRepository {
    static async create(resource: InsertResource, db: DrizzleDatabase | TransactionScope = database): Promise<SelectResource> {
        const [createdResource] = await db
            .insert(resources)
            .values(resource)
            .returning();
        return createdResource;
    }

    static async findAll(db: DrizzleDatabase | TransactionScope = database): Promise<SelectResource[]> {
        return db
            .select()
            .from(resources);
    }

    static async existsById(id: number, db: DrizzleDatabase | TransactionScope = database): Promise<boolean> {
        const [result] = await db
            .select({ exists: sql<number>`1` })
            .from(resources)
            .where(eq(resources.id, id))
            .limit(1);
        return result.exists === 1;
    }

    static async existsByName(name: string, db: DrizzleDatabase | TransactionScope = database): Promise<boolean> {
        const [result] = await db
            .select({ exists: sql<number>`1` })
            .from(resources)
            .where(eq(resources.name, name))
            .limit(1);
        return result.exists === 1;
    }

    static async deleteById(id: number, db: DrizzleDatabase | TransactionScope = database): Promise<SelectResource> {
        const [deletedResource] = await db
            .delete(resources)
            .where(eq(resources.id, id))
            .returning();
        return deletedResource;
    }
}
