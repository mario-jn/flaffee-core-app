import { Request, Response, NextFunction } from 'express';
import {ResourceService} from "./resource.service";
import {CreateResourceRequest, ResourceResponse} from "./resource.model";

export class ResourceController {
    static async createResource(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const createResourceRequest: CreateResourceRequest = request.body as CreateResourceRequest;
            const createResourceResponse = await ResourceService.createResource(createResourceRequest);
            response.status(200).json({
                data: createResourceResponse
            })
        } catch (error) {
            next(error);
        }
    }

    static async getResources(request: Request, response: Response, next: NextFunction): Promise<void> {
        try{
            const resources = await ResourceService.getResources();
            response.status(200).json({
                data: resources
            })
        }catch(error){
            next(error);
        }
    }

    static async deleteResource(request: Request, response: Response, next: NextFunction): Promise<void> {
        try{
            const resourceId = parseInt(request.params.resourceId, 10);
            const deletedResource = await ResourceService.deleteResource(resourceId);
            response.status(200).json({
                data: deletedResource
            })
        }catch(error){
            next(error);
        }
    }
}
