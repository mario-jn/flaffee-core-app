import {
    InsertRole,
    RoleWithPermissions,
    SelectRole,
    SelectRolePermission,
    Permissions,
    SelectRolePermissions
} from "./role.model";
import {database, DrizzleDatabase, TransactionScope} from "../application/database";
import {roles} from "../schema/roles";
import {and, eq, inArray, sql} from "drizzle-orm";
import {rolePermissions} from "../schema/role-permissions";

export class RoleRepository {
    static async create(role: InsertRole, db: DrizzleDatabase | TransactionScope = database): Promise<SelectRole> {
        const [createdRole] = await db
            .insert(roles)
            .values(role)
            .returning();
        return createdRole;
    }

    static async findAll(db: DrizzleDatabase | TransactionScope = database): Promise<SelectRole[]> {
        return db.select().from(roles);
    }

    static async findById(id: number, db: DrizzleDatabase | TransactionScope = database): Promise<SelectRole> {
        const [result] = await db.select().from(roles).where(eq(roles.id, id)).limit(1);
        return result;
    }

    static async findByIds(ids: number[], db: DrizzleDatabase | TransactionScope = database): Promise<SelectRole[]> {
        return db.select().from(roles).where(inArray(roles.id, ids));
    }

    static async findByName(name: string, db: DrizzleDatabase | TransactionScope = database): Promise<SelectRole> {
        const [result] = await db.select().from(roles).where(eq(roles.name, name)).limit(1);
        return result;
    }

    static async existsById(id: number, db: DrizzleDatabase | TransactionScope = database): Promise<boolean> {
        const [result] = await db.select({exists: sql<number>`1`}).from(roles).where(eq(roles.id, id)).limit(1);
        return result.exists === 1;
    }

    static async existsByName(name: string, db: DrizzleDatabase | TransactionScope = database): Promise<boolean> {
        const [result] = await db.select({exists: sql<number>`1`}).from(roles).where(eq(roles.name, name)).limit(1);
        return result.exists === 1;
    }

    static async deleteById(id: number, db: DrizzleDatabase | TransactionScope = database): Promise<SelectRole> {
        const [deletedRole] = await db.delete(roles).where(eq(roles.id, id)).returning();
        return deletedRole;
    }

    static async assignPermissions(roleId: number, permissionIds: number[], db: DrizzleDatabase | TransactionScope = database) : Promise<SelectRolePermissions[]> {
        return db
            .insert(rolePermissions)
            .values(permissionIds.map(permissionId => ({roleId: roleId, permissionId: permissionId})))
            .returning();
    }

    static async getAssignedPermissionIds(roleId: number, db: DrizzleDatabase | TransactionScope = database): Promise<number[]> {
        const results = await db.select({permissionId: rolePermissions.permissionId}).from(rolePermissions).where(eq(rolePermissions.roleId, roleId));
        return results.map(r => r.permissionId);
    }

    static async revokeAssignedPermissions(roleId: number, permissionIds: number[], db: DrizzleDatabase | TransactionScope = database): Promise<SelectRolePermission[]> {
        return db
            .delete(rolePermissions)
            .where(and(eq(rolePermissions.roleId, roleId), inArray(rolePermissions.permissionId, permissionIds)))
            .returning();
    }

    static async findWithPermissions(roleId: number, db: DrizzleDatabase | TransactionScope = database): Promise<RoleWithPermissions> {
        const results = await db.query.roles.findMany(
            {
                where: eq(roles.id, roleId),
                limit: 1,
                columns: {
                  createdAt: false,
                  updatedAt: false,
                },
                with: {
                    rolePermissions: {
                        with: {
                            permissions: {
                                columns: {
                                    createdAt: false,
                                    updatedAt: false,
                                }
                            }
                        }
                    }
                }
            }
        )
        const [result] = results.map(role => ({
            id: role.id,
            name: role.name,
            permissions: role.rolePermissions.map(rp => rp.permissions)
        }));
        return result;
    }
}
