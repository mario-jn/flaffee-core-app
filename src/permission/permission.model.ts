import { z } from 'zod';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { permissions } from '../schema/permissions';
import {PermissionValidation} from "./permission.validation";

type SelectPermission = InferSelectModel<typeof permissions>;
type InsertPermission = InferInsertModel<typeof permissions>;
type CreatePermissionRequest = z.infer<typeof PermissionValidation.CREATE>;
type PermissionId = Pick<SelectPermission, 'id'>;
type CreatePermissionResponse = PermissionId;
type DeletePermissionResponse = PermissionId;

export {
    SelectPermission,
    InsertPermission,
    CreatePermissionRequest,
    CreatePermissionResponse,
    DeletePermissionResponse,
};
