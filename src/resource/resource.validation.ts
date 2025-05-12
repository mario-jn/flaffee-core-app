import {z, ZodType} from "zod";

export class ResourceValidation {
    static readonly CREATE = z.object({
        name: z.string().max(128),
        description: z.string().optional(),
    });
}