import {
    AssignPermissionsToRoleResponse,
    CreateRoleRequest,
    RoleResponse,
    RoleWithPermissions,
    Permissions,
    RevokePermissionsFromRoleResponse, AssignPermissionsToRoleRequest, RevokePermissionsFromRoleRequest
} from "./role.model";
import {RoleValidation} from "./role.validation";
import {RoleRepository} from "./role.repository";
import {ResponseError} from "../error/response-error";
import {database} from "../application/database";
import {PermissionRepository} from "../permission/permission.repository";

export class RoleService {
    static async createRole(request: CreateRoleRequest): Promise<RoleResponse> {
        const role = RoleValidation.CREATE.parse(request);
        const exists = await RoleRepository.existsByName(role.name);
        if (exists) {
            throw new ResponseError(400, 'Role already exists', 'Role telah tersedia');
        }
        return await RoleRepository.create(role);
    }

    static async getRoles(): Promise<RoleResponse[]> {
        return await RoleRepository.findAll();
    }

    static async deleteRole(roleId: number): Promise<RoleResponse> {
        const exists = await RoleRepository.existsById(roleId);
        if (!exists) {
            throw new ResponseError(400, 'Role is not exists', 'Role tidak ada');
        }
        return await RoleRepository.deleteById(roleId);
    }

    static async assignPermissions(roleId: number, request: AssignPermissionsToRoleRequest): Promise<AssignPermissionsToRoleResponse> {
        const assignPermissionsToRoleRequest = RoleValidation.ASSIGN_PERMISSIONS.parse(request);
        const permissionIds = assignPermissionsToRoleRequest.permissionIds;
        return await database.transaction(async (tx) => {
            // check if role exists
            const role = await RoleRepository.findById(roleId, tx);
            if (!role) {
                throw new ResponseError(400, 'Role is not exists', 'Role tidak ada');
            }

            // check if permissions exists
            const existingPermissions = await PermissionRepository.findByIds(permissionIds, tx);
            const missingPermissions = permissionIds.filter(id => !new Set(existingPermissions.map(permissions => permissions.id)).has(id))
            if (missingPermissions.length > 0) {
                throw new ResponseError(400, `Permission with the following id doesnt exists:  ${missingPermissions}`, `Permission dengan id sebagai berikut tidak tersedia: ${missingPermissions}`);
            }

            // find already assigned permissions
            const assignedPermissionIds = await RoleRepository.getAssignedPermissionIds(roleId, tx);

            // find new permissions to be assigned
            const permissionsToInsert = permissionIds.filter((id) => !(new Set(assignedPermissionIds).has(id)));

            // assign new permissions to role
            if (permissionsToInsert.length > 0) {
                const result = await RoleRepository.assignPermissions(roleId, permissionsToInsert, tx);
                return {roleId: roleId, permissionIds: result.map((r) => r.permissionId)};
            }
            return {roleId: roleId, permissionIds: []}
        });
    }

    static async getPermissions(roleId: number): Promise<Permissions> {
        return await database.transaction(async (tx) => {
            // check if role exists
            const role = await RoleRepository.findById(roleId, tx);
            if (!role) {
                throw new ResponseError(400, 'Role is not exists', 'Role tidak ada');
            }
            const roleWithPermissions = await RoleRepository.findWithPermissions(roleId, tx);
            return roleWithPermissions.permissions;
        });
    }

    static async revokePermissions(roleId: number, request: RevokePermissionsFromRoleRequest): Promise<RevokePermissionsFromRoleResponse> {
        const revokePermissionsToRoleRequest = RoleValidation.REVOKE_PERMISSIONS.parse(request);
        const permissionIds = revokePermissionsToRoleRequest.permissionIds;
        return await database.transaction(async (tx) => {
            // check if role exists
            const role = await RoleRepository.findById(roleId, tx);
            if (!role) {
                throw new ResponseError(400, 'Role is not exists', 'Role tidak ada');
            }

            // find already assigned permissions
            const assignedPermissionIds = await RoleRepository.getAssignedPermissionIds(roleId, tx);

            // check permissions that cannot be revoked due yet assigned
            const invalidPermissionsToRevoke = permissionIds.filter((id) => !(new Set(assignedPermissionIds).has(id)));
            if (invalidPermissionsToRevoke.length > 0) {
                throw new ResponseError(400, `The following permission id cannot be revoked: ${invalidPermissionsToRevoke}`, `Permissions berikut tidak dapat di revoked: ${invalidPermissionsToRevoke}`);
            }

            // find valid permission to be revoked
            const permissionsToRevoke = permissionIds.filter(id => (new Set(assignedPermissionIds).has(id)));
            if(permissionsToRevoke.length > 0) {
                   const result = await RoleRepository.revokeAssignedPermissions(roleId, permissionsToRevoke, tx);
                   return {roleId: roleId, permissionIds: result.map((r) => r.permissionId)};
            }
            return {roleId: roleId, permissionIds: []}
        });
    }
}
