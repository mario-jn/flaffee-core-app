import { Request, Response, NextFunction } from 'express';
import {
    AssignRolesToEmployeeRequest,
    CreateEmployeeRequest,
    RevokeRolesFromEmployeeRequest,
    UpdateEmployeeRequest
} from "./employee.model";
import {EmployeeService} from "./employee.service";

export class EmployeeController {
    static async createEmployee(request: Request, response: Response, next: NextFunction) {
        try{
            const createEmployeeRequest: CreateEmployeeRequest = request.body as CreateEmployeeRequest;
            const createdEmployee = await EmployeeService.createEmployee(createEmployeeRequest);
            response.status(200).json({
                data: createdEmployee
            })
        }catch(error){
            next(error);
        }
    }

    static async getEmployees(request: Request, response: Response, next: NextFunction) {
        try{
            const employees = await EmployeeService.getEmployees();
            response.status(200).json({
                data: employees
            })
        }catch(error){
            next(error);
        }
    }

    static async getEmployee(request: Request, response: Response, next: NextFunction) {
        try{
            const employeeId = request.params.employeeId;
            const employee = await EmployeeService.getEmployee(employeeId);
            response.status(200).json({
                data: employee
            })
        }catch(error){
            next(error);
        }
    }

    static async updateEmployee(request: Request, response: Response, next: NextFunction) {
        try{
            const employeeId = request.params.employeeId;
            const updateEmployeeRequest: UpdateEmployeeRequest = request.body as UpdateEmployeeRequest;
            const employee = await EmployeeService.updateEmployee(employeeId, updateEmployeeRequest);
            response.status(200).json({
                data: employee
            })
        }catch(error){
            next(error);
        }
    }

    static async deleteEmployee(request: Request, response: Response, next: NextFunction) {
        try{
            const employeeId = request.params.employeeId;
            await EmployeeService.deleteEmployee(employeeId);
            response.status(200);
        }catch(error){
            next(error);
        }
    }

    static async getRoles(request: Request, response: Response, next: NextFunction) {
        try{
            const employeeId = request.params.employeeId;
            const roles = await EmployeeService.getRoles(employeeId);
            response.status(200).json({
                data: roles
            })
        }catch(error){
            next(error);
        }
    }

    static async assignRoles(request: Request, response: Response, next: NextFunction) {
        try{
            const employeeId = request.params.employeeId;
            const assignRolesToEmployeeRequest = request.body as AssignRolesToEmployeeRequest;
            const results = await EmployeeService.assignRoles(employeeId, assignRolesToEmployeeRequest);
            response.status(200).json({
                data: results
            })
        }catch(error){
            next(error);
        }
    }

    static async revokeRoles(request: Request, response: Response, next: NextFunction) {
        try{
            const employeeId = request.params.employeeId;
            const revokeRolesFromEmployeeRequest = request.body as RevokeRolesFromEmployeeRequest;
            const results = await EmployeeService.revokeRoles(employeeId, revokeRolesFromEmployeeRequest);
            response.status(200).json({
                data: results
            })
        }catch(error){
            next(error);
        }
    }

    static async getPermissions(request: Request, response: Response, next: NextFunction) {
        try{
            const employeeId = request.params.employeeId;
            const permissions = await EmployeeService.getPermissions(employeeId);
            response.status(200).json({
                data: permissions
            })
        }catch(error){
            next(error);
        }
    }
}
