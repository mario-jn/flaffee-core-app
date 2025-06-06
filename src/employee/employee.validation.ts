import {z} from "zod";

export class EmployeeValidation {
    static readonly CREATE = z.object({
        id: z.string().length(9),
        name: z.string().max(255),
        email: z.string().email(),
        password: z.string().min(8),
    });

    static readonly UPDATE = z.object({
        name: z.string().max(255).optional(),
        email: z.string().email().optional(),
        password: z.string().min(8).optional(),
    });

    static readonly ASSIGN_ROLES = z.object({
        roleIds: z.number().nonnegative().array(),
    });

    static readonly REVOKE_ROLES = EmployeeValidation.ASSIGN_ROLES;
}