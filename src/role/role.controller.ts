import { Request, Response, NextFunction } from "express";
import {AssignPermissionsToRoleRequest, CreateRoleRequest, RevokePermissionsFromRoleRequest} from "./role.model";
import {RoleService} from "./role.service";

export class RoleController {
    static async createRole(request: Request, response: Response, next: NextFunction): Promise<void> {
        try{
            const createRoleRequest: CreateRoleRequest = request.body as CreateRoleRequest;
            const createdRole = await RoleService.createRole(createRoleRequest);
            response.status(200).json({
                data: createdRole
            })
        }catch(error){
            next(error);
        }
    }

    static async getRoles(request: Request, response: Response, next: NextFunction): Promise<void> {
        try{
            const roles = await RoleService.getRoles();
            response.status(200).json({
                data: roles
            })
        }catch(error){
            next(error);
        }
    }

    static async deleteRole(request: Request, response: Response, next: NextFunction) {
        try{
            const roleId = parseInt(request.params.roleId, 10);
            const deletedRole = await RoleService.deleteRole(roleId);
            response.status(200).json({
                data: deletedRole
            })
        }catch(error){
            next(error);
        }
    }

    static async assignPermissions(request: Request, response: Response, next: NextFunction) {
        try{
            const roleId = parseInt(request.params.roleId, 10);
            const assignPermissionsToRoleRequest : AssignPermissionsToRoleRequest = request.body as AssignPermissionsToRoleRequest;
            const assignedRolePermissions = await RoleService.assignPermissions(roleId, assignPermissionsToRoleRequest);
            response.status(200).json({
                data: assignedRolePermissions
            })
        }catch(error){
            next(error);
        }
    }

    static async getPermissions(request: Request, response: Response, next: NextFunction) {
        try{
            const roleId = parseInt(request.params.roleId, 10);
            const rolePermissions = await RoleService.getPermissions(roleId);
            response.status(200).json({
                data: rolePermissions
            })
        }catch(error){
            next(error);
        }
    }

    static async revokePermissions(request: Request, response: Response, next: NextFunction) {
        try{
            const roleId = parseInt(request.params.roleId, 10);
            const revokePermissionsFromRoleRequest: RevokePermissionsFromRoleRequest = request.body as RevokePermissionsFromRoleRequest;
            const revokedRolePermissions = await RoleService.revokePermissions(roleId, revokePermissionsFromRoleRequest);
            response.status(200).json({
                data: revokedRolePermissions
            })
        }catch(error){
            next(error);
        }
    }
}
