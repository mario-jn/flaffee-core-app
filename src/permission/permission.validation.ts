import {z} from "zod";

export class PermissionValidation {
    static readonly CREATE = z.object({
        action: z.string().max(128),
        resourceId: z.number(),
    });

    static readonly DELETE = z.number().nonnegative();
}
