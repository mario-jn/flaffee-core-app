import { InsertRole, SelectRole } from "./role.model";
import {database} from "../application/database";
import {roles} from "../schema/roles";
import {eq, sql} from "drizzle-orm";

export class RoleRepository {
    static async create(role: InsertRole): Promise<SelectRole> {
        const [createdRole] = await database
            .insert(roles)
            .values(role)
            .returning();
        return createdRole;
    }

    static async findAll(): Promise<SelectRole[]> {
        return database.select().from(roles);
    }

    static async findById(id: number): Promise<SelectRole> {
        const [result] = await database.select().from(roles).where(eq(roles.id, id)).limit(1);
        return result;
    }

    static async findByName(name: string): Promise<SelectRole> {
        const [result] = await database.select().from(roles).where(eq(roles.name, name)).limit(1);
        return result;
    }

    static async existsById(id: number): Promise<boolean> {
        const [result] = await database.select({exists: sql<number>`1`}).from(roles).where(eq(roles.id, id)).limit(1);
        return result.exists === 1;
    }

    static async existsByName(name: string): Promise<boolean> {
        const [result] = await database.select({exists: sql<number>`1`}).from(roles).where(eq(roles.name, name)).limit(1);
        return result.exists === 1;
    }

    static async deleteById(id: number): Promise<SelectRole> {
        const [deletedRole] = await database.delete(roles).where(eq(roles.id, id)).returning();
        return deletedRole;
    }
}