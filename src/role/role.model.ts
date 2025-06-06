import { z } from 'zod';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { roles } from '../schema/roles';
import {RoleValidation} from "./role.validation";
import {rolePermissions} from "../schema/role-permissions";
import {permissions} from "../schema/permissions";

type SelectRole = InferSelectModel<typeof roles>;
type InsertRole = InferInsertModel<typeof roles>;
type CreateRoleRequest = z.infer<typeof RoleValidation.CREATE>;
type RoleResponse = Partial<SelectRole>;

type SelectPermission = InferSelectModel<typeof permissions>;
type InsertPermission = InferInsertModel<typeof permissions>;
type Permissions = {
    id: number;
    action: string;
    resourceId: number
}[];
type RoleWithPermissions = {
    id: number;
    name: string;
    permissions: Permissions;
};
type SelectRolePermissions = InferSelectModel<typeof rolePermissions>;

type SelectRolePermission = InferSelectModel<typeof rolePermissions>;

type AssignPermissionsToRoleRequest = z.infer<typeof RoleValidation.ASSIGN_PERMISSIONS>;
type AssignPermissionsToRoleResponse = {
    roleId: number;
    permissionIds: number[];
};
type RevokePermissionsFromRoleRequest = AssignPermissionsToRoleRequest;
type RevokePermissionsFromRoleResponse = AssignPermissionsToRoleResponse;


export { SelectRole, InsertRole, CreateRoleRequest,
    RoleResponse, SelectRolePermission, RoleWithPermissions, Permissions,
    SelectRolePermissions,
    AssignPermissionsToRoleRequest, AssignPermissionsToRoleResponse,
    RevokePermissionsFromRoleRequest,
    RevokePermissionsFromRoleResponse};
