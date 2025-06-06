import {employees} from '../schema/employees';
import {and, eq, inArray, isNull, sql} from 'drizzle-orm';
import {database, DrizzleDatabase, TransactionScope} from '../application/database';
import {Employee, EmployeeRole, InsertEmployee, UpdateEmployeeRequest, UserRoleId} from './employee.model';
import {userRoles} from "../schema/user-roles";

export class EmployeeRepository {
    static async create(employee: InsertEmployee, db: DrizzleDatabase | TransactionScope = database): Promise<Employee> {
        const [createdEmployee] = await db
            .insert(employees)
            .values(employee)
            .returning();
        return createdEmployee;
    }

    static async findAll(db: DrizzleDatabase | TransactionScope = database): Promise<Employee[]> {
        return db
            .select()
            .from(employees)
            .where(isNull(employees.deletedAt));
    }

    static async findById(id: string, db: DrizzleDatabase | TransactionScope = database): Promise<Employee> {
        const [result] = await db
            .select()
            .from(employees)
            .where(and(eq(employees.id, id), isNull(employees.deletedAt)))
            .limit(1);
        return result;
    }

    static async existsById(id: string, db: DrizzleDatabase | TransactionScope = database): Promise<boolean> {
        const [result] = await db
            .select({exists: sql<number>`1`})
            .from(employees)
            .where(and(eq(employees.id, id), isNull(employees.deletedAt)))
            .limit(1);
        return result.exists === 1;
    }

    static async existsByEmail(email: string, db: DrizzleDatabase | TransactionScope = database): Promise<boolean> {
        const [result] = await db
            .select({exists: sql<number>`1`})
            .from(employees)
            .where(and(eq(employees.email, email), isNull(employees.deletedAt)))
            .limit(1);
        return result.exists === 1;
    }

    static async update(employeeId:string, employee: UpdateEmployeeRequest, db: DrizzleDatabase | TransactionScope = database): Promise<Employee> {
        const [updatedEmployee] = await db
            .update(employees)
            .set(employee)
            .where(and(eq(employees.id, employeeId), isNull(employees.deletedAt)))
            .returning();
        return updatedEmployee;
    }

    static async delete(id: string, db: DrizzleDatabase | TransactionScope = database): Promise<Employee> {
        const [deletedEmployee] = await db
            .update(employees)
            .set({deletedAt: new Date()})
            .where(and(eq(employees.id, id), isNull(employees.deletedAt)))
            .returning();
        return deletedEmployee;
    }

    static async assignRoles(userId: string, roleIds: number[], db: DrizzleDatabase | TransactionScope = database): Promise<UserRoleId[]> {
        return db
            .insert(userRoles)
            .values(roleIds.map(roleId => ({userId, roleId})))
            .returning();
    }

    static async removeRoles(userId: string, roleIds: number[], db: DrizzleDatabase | TransactionScope = database): Promise<UserRoleId[]> {
        return db
            .delete(userRoles)
            .where(and(eq(userRoles.userId, userId), inArray(userRoles.roleId, roleIds)))
            .returning();
    }

    static async getAssignedRoleIds(employeeId: string, db: DrizzleDatabase | TransactionScope = database): Promise<number[]> {
        const results =  await db.select({roleId: userRoles.roleId}).from(userRoles).where(eq(userRoles.userId, employeeId));
        return results.map(r => r.roleId);
    }

    static async findWithRoles(employeeId: string, db: DrizzleDatabase | TransactionScope = database): Promise<EmployeeRole> {
        const results = await db.query.employees.findMany(
            {
                where: eq(employees.id, employeeId),
                limit: 1,
                columns: {
                    createdAt: false,
                    updatedAt: false,
                    deletedAt: false,
                },
                with: {
                    userRoles: {
                        with: {
                            roles: {
                                columns: {
                                    createdAt: false,
                                    updatedAt: false,
                                }
                            }
                        }
                    }
                }
            }
        );
        const [result] = results.map(employee => ({
            id: employee.id,
            name: employee.name,
            email: employee.email,
            password: employee.password,
            roles: employee.userRoles.map(ur => ur.roles)
        }));
        return result;
    }
}
