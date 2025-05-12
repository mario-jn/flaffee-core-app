import {z} from "zod";

export class RoleValidation {
    static readonly CREATE = z.object({
        name: z.string().max(64),
    });

    static readonly ASSIGN_PERMISSIONS = z.object({
       permissionIds: z.number().nonnegative().array(),
    });
}