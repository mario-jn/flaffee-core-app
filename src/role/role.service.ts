import {CreateRoleRequest, RoleResponse} from "./role.model";
import {RoleValidation} from "./role.validation";
import {RoleRepository} from "./role.repository";
import {ResponseError} from "../error/response-error";

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

}
