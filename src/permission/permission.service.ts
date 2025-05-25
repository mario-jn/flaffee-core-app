import {CreatePermissionRequest, CreatePermissionResponse, DeletePermissionResponse} from './permission.model';
import {PermissionRepository} from './permission.repository';
import {ResponseError} from '../error/response-error';
import {ResourceRepository} from "../resource/resource.repository";
import {PermissionValidation} from "./permission.validation";

export class PermissionService {
    static async createPermission(request: CreatePermissionRequest): Promise<CreatePermissionResponse> {
        const permission = PermissionValidation.CREATE.parse(request);
        const resourceExists = await ResourceRepository.existsById(permission.resourceId);
        if (resourceExists) {
            throw new ResponseError(400, 'Resource is not exists', 'Resource tidak ada');
        }
        const permissionExists = await PermissionRepository.existsByActionWithResource(permission.action, permission.resourceId);
        if (permissionExists) {
            throw new ResponseError(400, `Permission already exists`, 'Permission telah tersedia');
        }
        return await PermissionRepository.create(permission);
    }

    static async deletePermission(permissionId: number): Promise<DeletePermissionResponse> {
        permissionId = PermissionValidation.DELETE.parse(permissionId);
        const exists = await PermissionRepository.existsById(permissionId);
        if (exists) {
            throw new ResponseError(400, 'Permission is not exists', 'Permission tidak ada');
        }
        return await PermissionRepository.deleteById(permissionId);
    }
}
