import {CreateEmployeeRequest, CreateEmployeeSchema, EmployeeId} from "../employee/employee.model";
import {EmployeeRepository} from "../employee/employee.repository";
import {ResponseError} from "../error/response-error";
import bcrypt from "bcrypt";

export class AuthService {
    static async register(request: CreateEmployeeRequest): Promise<EmployeeId> {
        const employee = CreateEmployeeSchema.parse(request);
        const useridExists = await EmployeeRepository.existsById(employee.id);
        if (useridExists) {
            throw new ResponseError(400, 'UserId already used', 'UserId telah terpakai');
        }
        const emailExists = await EmployeeRepository.existsByEmail(employee.email);
        if (emailExists) {
            throw new ResponseError(400, 'Email already used', 'Email telah terpakai');
        }
        employee.password = await bcrypt.hash(employee.password, 10);
        const createdEmployee = await EmployeeRepository.create(employee);
        return { employeeId: createdEmployee.id };
    }

    static async login() {

    }

    static async logout() {

    }

    static async resetPassword() {

    }

    static async forgotPassword() {

    }
}