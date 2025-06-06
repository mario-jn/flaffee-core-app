import {
    AssignRolesToEmployeeRequest,
    CreateEmployeeRequest,
    Employee,
    RevokeRolesFromEmployeeRequest, Roles,
    UpdateEmployeeRequest
} from "./employee.model";
import {EmployeeRepository} from "./employee.repository";
import {ResponseError} from "../error/response-error";
import {database} from "../application/database";
import {EmployeeValidation} from "./employee.validation";
import {RoleRepository} from "../role/role.repository";
import {EmployeeController} from "./employee.controller";
import {roleRelations} from "../schema/roles";
import {RoleService} from "../role/role.service";
import {Permissions} from "../role/role.model";

export class EmployeeService {

    static async createEmployee(request: CreateEmployeeRequest): Promise<Employee>{
        const employee = EmployeeValidation.CREATE.parse(request);
        return await database.transaction(async (tx) => {
            const exists = await EmployeeRepository.existsById(employee.id);
            if(exists) {
                throw new ResponseError(400, "Employee is already exists", "Employee telah tersedia");
            }

            const emailExists = await EmployeeRepository.existsByEmail(employee.email);
            if(emailExists) {
                throw new ResponseError(400, "Email is already used", "Email telah digunakan");
            }
            return await EmployeeRepository.create(employee)
        });
    }

    static async getEmployees(): Promise<Employee[]> {
        return await EmployeeRepository.findAll();
    }

    static async getEmployee(employeeId : string): Promise<Employee> {
        const employee = await EmployeeRepository.findById(employeeId);
        if(employee === null || employee === undefined) {
            throw new ResponseError(400, "Employee did not exists", "Tidak ada");
        }
        return employee;
    }

    static async updateEmployee(employeeId: string, request: UpdateEmployeeRequest): Promise<Employee>{
        const updateEmployeeRequest = EmployeeValidation.UPDATE.parse(request);
        return await database.transaction(async (tx) => {
            const exists = await EmployeeRepository.existsById(employeeId, tx);
            if(exists) {
                throw new ResponseError(400, "Employee is already exists", "Employee telah tersedia");
            }

            return await EmployeeRepository.update(employeeId, updateEmployeeRequest, tx);
        });
    }

    static async deleteEmployee(employeeId: string): Promise<void>{
        await database.transaction(async (tx) => {
            const exists = await EmployeeRepository.existsById(employeeId, tx);
            if(!exists) {
                return;
            }
            await EmployeeRepository.delete(employeeId, tx);
        });
    }

    static async getRoles(employeeId: string): Promise<Roles>{
        return await database.transaction(async (tx) => {
            const exists = await EmployeeRepository.existsById(employeeId, tx);
            if(exists) {
                throw new ResponseError(400, "Employee is already exists", "Employee telah tersedia");
            }

            const employeeWithRoles = await EmployeeRepository.findWithRoles(employeeId, tx);
            return employeeWithRoles.roles;
        })
    }

    static async assignRoles(employeeId: string, request: AssignRolesToEmployeeRequest) {
        const assignRolesToEmployeeRequest = EmployeeValidation.ASSIGN_ROLES.parse(request);
        const roleIds = assignRolesToEmployeeRequest.roleIds;
        await database.transaction(async (tx) => {
            // check if employee exists
            const exists = await EmployeeRepository.existsById(employeeId, tx);
            if(exists) {
                throw new ResponseError(400, "Employee is already exists", "Employee telah tersedia");
            }

            // check if role exists
            const existingRoles = await RoleRepository.findByIds(roleIds, tx);
            const missingRoles = roleIds.filter(id => !new Set(existingRoles.map(role => role.id)).has(id))
            if(missingRoles.length > 0) {
                throw new ResponseError(400, `Missing roles: ${missingRoles}`, "");
            }

            // find already assigned roles
            const assignedRoleIds = await EmployeeRepository.getAssignedRoleIds(employeeId, tx);

            // find new roles to be asssigned
            const rolesToAssign = roleIds.filter(id => !new Set(assignedRoleIds).has(id))

            // assign new roles to employee
            if(rolesToAssign.length > 0){
                const result = await EmployeeRepository.assignRoles(employeeId, rolesToAssign, tx);
                return {employeeId: employeeId, roleIds: result.map(r=>r.roleId)};
            }
            return {employeeId: employeeId, roleIds: []};
        });
    }

    static async revokeRoles(employeeId: string, request: RevokeRolesFromEmployeeRequest) {
       const revokeRolesFromEmployeeRequest = EmployeeValidation.REVOKE_ROLES.parse(request);
       const roleIds = revokeRolesFromEmployeeRequest.roleIds;
       await database.transaction(async (tx) => {
           // check if employee exists
           const exists = await EmployeeRepository.existsById(employeeId, tx);
           if(exists) {
               throw new ResponseError(400, "Employee is already exists", "Employee telah tersedia");
           }

           // find already assigned roles
           const assignedRoleIds = await EmployeeRepository.getAssignedRoleIds(employeeId, tx);

           // check roels that cannot be revoked due yet to be assigned
           const invalidRolesToRevoke = roleIds.filter(id => !new Set(assignedRoleIds).has(id));
           if(invalidRolesToRevoke.length > 0) {
               throw new ResponseError(400, `Invalid roles to revoke: ${invalidRolesToRevoke}`, '');
           }

           const rolesToRevoke = roleIds.filter(id => new Set(assignedRoleIds).has(id));
           if(rolesToRevoke.length > 0){
               const result = await EmployeeRepository.removeRoles(employeeId, rolesToRevoke, tx);
           }
       });
    }

    static async getPermissions(employeeId: string): Promise<Permissions[]> {
        return await database.transaction(async (tx) => {
            // check if employee exists
            const exists = await EmployeeRepository.existsById(employeeId, tx);
            if(exists) {
                throw new ResponseError(400, "Employee is already exists", "Employee telah tersedia");
            }

            // find already assigned roles
            const assignedRoleIds = await EmployeeRepository.getAssignedRoleIds(employeeId, tx);

            // get permissions
            const permissions: Permissions[] = []
            for(let roleId of assignedRoleIds){
                const roleWithPermissions = await RoleRepository.findWithPermissions(roleId, tx);
                permissions.push(roleWithPermissions.permissions);
            }

            return permissions;
        })
    }
}
