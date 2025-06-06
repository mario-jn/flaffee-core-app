import {CreateResourceRequest, ResourceResponse} from './resource.model';
import {ResourceRepository} from './resource.repository';
import {ResponseError} from '../error/response-error';
import {ResourceValidation} from "./resource.validation";
import {database} from "../application/database";

export class ResourceService {
    static async createResource(request: CreateResourceRequest): Promise<ResourceResponse> {
        const resource = ResourceValidation.CREATE.parse(request);
        return await database.transaction(async(tx) => {
            const exists = await ResourceRepository.existsByName(resource.name, tx);
            if (exists) {
                throw new ResponseError(400, 'Resource already exists', 'Resource telah tersedia');
            }
            return await ResourceRepository.create(resource);
        });
    }

    static async getResources(): Promise<ResourceResponse[]> {
        return await ResourceRepository.findAll();
    }

    static async deleteResource(resourceId: number): Promise<ResourceResponse> {
        return await database.transaction(async(tx) => {
            const exists = await ResourceRepository.existsById(resourceId, tx);
            if (!exists) {
                throw new ResponseError(400, 'Resource is not exists', 'Resource tidak ada');
            }
            return await ResourceRepository.deleteById(resourceId);
        });
    }
}
