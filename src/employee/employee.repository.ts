import {employees} from '../schema/employees';
import {and, eq, inArray, isNull, sql} from 'drizzle-orm';
import {database} from '../application/database';
import {Employee, InsertEmployee, UserRoleId} from './employee.model';
import {userRoles} from "../schema/user-roles";

export class EmployeeRepository {
    async create(employee: InsertEmployee): Promise<Employee> {
        const [createdEmployee] = await database
            .insert(employees)
            .values(employee)
            .returning();
        return createdEmployee;
    }

    async findAll(): Promise<Employee[]> {
        return database.select().from(employees).where(isNull(employees.deletedAt));
    }

    async findById(id: string): Promise<Employee> {
        const [result] = await database
            .select()
            .from(employees)
            .where(and(eq(employees.id, id), isNull(employees.deletedAt)))
            .limit(1);
        return result;
    }

    async existsById(id: string): Promise<boolean> {
        const [result] = await database
            .select({exists: sql<number>`1`})
            .from(employees)
            .where(and(eq(employees.id, id), isNull(employees.deletedAt)))
            .limit(1);
        return result.exists === 1;
    }

    async existsByEmail(email: string): Promise<boolean> {
        const [result] = await database
            .select({exists: sql<number>`1`})
            .from(employees)
            .where(and(eq(employees.email, email), isNull(employees.deletedAt)))
            .limit(1);
        return result.exists === 1;
    }

    async update(employee: InsertEmployee): Promise<Employee> {
        const [updatedEmployee] = await database.update(employees).set(employee).where(and(eq(employees.id, employee.id), isNull(employees.deletedAt))).returning();
        return updatedEmployee;
    }

    async deleteById(id: string): Promise<Employee> {
        const [deletedEmployee] = await database.update(employees).set({deletedAt: new Date()}).where(and(eq(employees.id, id), isNull(employees.deletedAt))).returning();
        return deletedEmployee;
    }

    async assignRole(userId: string, roleId: number): Promise<UserRoleId> {
        const [createdUserRole] = await database
            .insert(userRoles)
            .values({userId: userId, roleId: roleId})
            .returning();
        return createdUserRole;
    }

    async assignRoles(userId: string, roleIds: number[]): Promise<UserRoleId[]> {
        return database
            .insert(userRoles)
            .values(roleIds.map(roleId => ({userId, roleId})))
            .returning();
    }

    async removeRole(userId: string, roleId: number): Promise<UserRoleId> {
        const [deletedUserRole] = await database.delete(userRoles).where(and(eq(userRoles.userId, userId), eq(userRoles.roleId, roleId))).returning();
        return deletedUserRole;
    }

    async removeRoles(userId: string, roleIds: number[]): Promise<UserRoleId[]> {
        return database.delete(userRoles).where(and(eq(userRoles.userId, userId), inArray(userRoles.roleId, roleIds))).returning();
    }
}
