import {CreateEmployeeRequest, CreateEmployeeSchema, Employee, EmployeeId} from "./employee.model";
import {EmployeeRepository} from "./employee.repository";
import {ResponseError} from "../error/response-error";

export class EmployeeService {
    constructor(private readonly employeeRepository: EmployeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    async createEmployee(request: CreateEmployeeRequest): Promise<EmployeeId>{
        const employee = CreateEmployeeSchema.parse(request);
        const exists = await this.employeeRepository.existsById(employee.id);
        if(exists) {
            throw new ResponseError(400, "Employee is already exists", "Employee telah tersedia");
        }
        const emailExists = await this.employeeRepository.existsByEmail(employee.email);
        if(emailExists) {
            throw new ResponseError(400, "Email is already used", "Email telah digunakan");
        }
        const createdEmployee = await this.employeeRepository.create(employee);
        return {employeeId: createdEmployee.id};
    }

    async getEmployeeById(id: string) : Promise<Employee>{
        return await this.employeeRepository.findById(id);
    }

    async getEmployees(): Promise<Employee[]> {
        return await this.employeeRepository.findAll();
    }

    static async updateEmployee(request: UpdateEmployeeRequest): Promise<EmployeeId>{

    }

    static async deleteEmployee(): Promise<EmployeeId{
        throw Error();
    }

    static async getEmployeeRoles(){
        throw Error();
    }

    static async assignEmployeeRoles() {
        throw Error();
    }

    static async revokeEmployeeRoles() {
        throw Error();
    }

    static async getEmployeePermissions() {
        throw Error();
    }
}
