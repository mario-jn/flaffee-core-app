import { Request, Response, NextFunction } from "express";
import {CreateRoleRequest} from "./role.model";
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

        }catch(error){
            next(error);
        }
    }
}
