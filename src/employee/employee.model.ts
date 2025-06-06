import { z } from 'zod';
import { employees } from '../schema/employees';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {userRoles} from "../schema/user-roles";
import {EmployeeValidation} from "./employee.validation";

type Employee = InferSelectModel<typeof employees>;
type InsertEmployee = InferInsertModel<typeof employees>;

type CreateEmployeeRequest = z.infer<typeof EmployeeValidation.CREATE>;
type UpdateEmployeeRequest = z.infer<typeof EmployeeValidation.UPDATE>;

type EmployeeId = {
    employeeId: string;
}

type Roles = {
    id: number;
    name: string;
}[]

type EmployeeRole = {
    id: string;
    name: string;
    email: string;
    password: string;
    roles: Roles;
}

type AssignRolesToEmployeeRequest = z.infer<typeof EmployeeValidation.ASSIGN_ROLES>;
type RevokeRolesFromEmployeeRequest = AssignRolesToEmployeeRequest;

type UserRoleId = InferSelectModel<typeof userRoles>


export { Employee, InsertEmployee, CreateEmployeeRequest, UpdateEmployeeRequest, EmployeeId, UserRoleId, EmployeeRole, Roles, AssignRolesToEmployeeRequest, RevokeRolesFromEmployeeRequest };
