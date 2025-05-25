import express from "express";
import {EmployeeController} from "../employee/employee.controller";
import {RoleController} from "../role/role.controller";
import {PermissionController} from "../permission/permission.controller";
import {ResourceController} from "../resource/resource.controller";

export const privateRouter = express.Router();

//employee
privateRouter.post('/api/employees', EmployeeController.createEmployee);
privateRouter.get('/api/employees', EmployeeController.getEmployees);
privateRouter.get('/api/employees/:employeeId', EmployeeController.getEmployee);
privateRouter.patch('/api/employees/:employeeId', EmployeeController.updateEmployee);
privateRouter.delete('/api/employees/:employeeId', EmployeeController.deleteEmployee);
//employee - role
privateRouter.get('/api/employees/:employeeId/roles', EmployeeController.getRoles);
privateRouter.post('/api/employees/:employeeId/roles', EmployeeController.assignRoles);
privateRouter.delete('/api/employees/:employeeId/roles', EmployeeController.revokeRoles);
//employee - permission
privateRouter.get('/api/employees/:employeeId/permissions', EmployeeController.getPermissions);

//roles
privateRouter.post('/api/roles', RoleController.createRole);
privateRouter.get('/api/roles', RoleController.getRoles);
privateRouter.delete('/api/roles/:roleId', RoleController.deleteRole);
//roles - permissions
privateRouter.post('/api/roles/:roleId/permissions', RoleController.assignPermissions);
privateRouter.get('/api/roles/:roleId/permissions', RoleController.getPermissions);
privateRouter.delete('/api/roles/:roleId/permissions', RoleController.revokePermissions);

//resources
privateRouter.post('/api/resources', ResourceController.createResource);
privateRouter.get('/api/resources', ResourceController.getResources);
privateRouter.delete('/api/resources/:resourceId', ResourceController.deleteResource);
//resources - permissions (?)
privateRouter.post('/api/resources/:resourceId/permissions', PermissionController.createPermission);
privateRouter.delete('/api/resources/:resourceId/permissions', PermissionController.deletePermission);