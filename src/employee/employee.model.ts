import { z } from 'zod';
import { employees } from '../schema/employees';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {userRoles} from "../schema/user-roles";

type Employee = InferSelectModel<typeof employees>;
type InsertEmployee = InferInsertModel<typeof employees>;

const CreateEmployeeSchema = z.object({
    id: z.string().length(9),
    name: z.string().max(255),
    email: z.string().email(),
    password: z.string().min(8),
});

type CreateEmployeeRequest = z.infer<typeof CreateEmployeeSchema>;

type EmployeeId = {
    employeeId: string;
}



type UserRoleId = InferSelectModel<typeof userRoles>


export { Employee, InsertEmployee, CreateEmployeeSchema, CreateEmployeeRequest, EmployeeId, UserRoleId };
