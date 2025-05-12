import { Request, Response, NextFunction } from "express";
import { CreatePermissionRequest } from "./permission.model";
import { PermissionService } from "./permission.service";

export class PermissionController {
    static async createPermission(request: Request, response: Response, next: NextFunction): Promise<void> {
        try{
            const createPermissionRequest: CreatePermissionRequest = request.body as CreatePermissionRequest;
            const createdPermission = await PermissionService.createPermission(createPermissionRequest);
            response.status(200).json({
                data: createdPermission
            });
        }catch(error){
            next(error);
        }
    }

    static async deletePermission(request: Request, response: Response, next: NextFunction): Promise<void> {
        try{
            const permissionId = parseInt(request.params.permissionId, 10);
            const deletedPermission = await PermissionService.deletePermission(permissionId);
            response.status(200).json({
                data: deletedPermission
            })
        }catch(error){
            next(error);
        }
    }
}