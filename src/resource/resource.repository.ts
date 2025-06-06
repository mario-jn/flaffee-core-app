import { InsertResource, SelectResource } from './resource.model';
import { database } from '../application/database';
import { resources } from '../schema/resources';
import { count, eq, sql } from 'drizzle-orm';

export class ResourceRepository {
    static async create(resource: InsertResource): Promise<SelectResource> {
        const [createdResource] = await database
            .insert(resources)
            .values(resource)
            .returning();
        return createdResource;
    }

    static async findAll(): Promise<SelectResource[]> {
        return database
            .select()
            .from(resources);
    }

    static async existsById(id: number): Promise<boolean> {
        const [result] = await database
            .select({ exists: sql<number>`1` })
            .from(resources)
            .where(eq(resources.id, id))
            .limit(1);
        return result.exists === 1;
    }

    static async existsByName(name: string): Promise<boolean> {
        const [result] = await database
            .select({ exists: sql<number>`1` })
            .from(resources)
            .where(eq(resources.name, name))
            .limit(1);
        return result.exists === 1;
    }

    static async deleteById(id: number): Promise<SelectResource> {
        const [deletedResource] = await database
            .delete(resources)
            .where(eq(resources.id, id))
            .returning();
        return deletedResource;
    }
}
