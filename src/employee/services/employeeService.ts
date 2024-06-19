import { EmployeeRepository } from "../repositories/EmployeeRepository";
import { Employee } from "../models/Employee";
import { DateUtils } from "../../shared/utils/DateUtils";

export class employeeService {

    public static async getAllEmployees(): Promise<Employee[]> {
        try{
            return await EmployeeRepository.findAll();
        }catch (error: any){
            throw new Error(`Error al obtener empleados: ${error.message}`);
        }
    }

    public static async getEmployeeById(employeeId: number): Promise<Employee | null> {
        try{
            return await EmployeeRepository.findById(employeeId);
        }catch (error: any){
            throw new Error(`Error al encontrar empleado: ${error.message}`);
        }
    }

    public static async addEmployee(employee: Employee) {
        try {
            employee.created_at = DateUtils.formatDate(new Date());
            employee.updated_at = DateUtils.formatDate(new Date());
            return await EmployeeRepository.createEmployee(employee);
        } catch (error: any) {
            throw new Error(`Error al crear empleado: ${error.message}`);
        }
    }

    public static async modifyEmployee(employeeId: number, employeeData: Employee){
        try{
            const employeeFinded =  await EmployeeRepository.findById(employeeId);
            if(employeeFinded){
                if(employeeData.full_name){
                    employeeFinded.full_name = employeeData.full_name;
                }
                if(employeeData.role_id_fk){
                    employeeFinded.role_id_fk = employeeData.role_id_fk;
                }
                if(employeeData.deleted){
                    employeeFinded.deleted = employeeData.deleted;
                }
            }else{
                return null;
            }
            employeeFinded.updated_by = employeeData.updated_by
            employeeFinded.updated_at = DateUtils.formatDate(new Date());
            return await EmployeeRepository.updateEmployee(employeeId, employeeFinded);
        }catch (error: any){
            throw new Error(`Error al modificar empleado: ${error.message}`);
        }
    }

    public static async deleteEmployee(employeeId: number): Promise<boolean> {
        try{
            return await EmployeeRepository.deleteEmployee(employeeId);
        }catch (error: any){
            throw new Error(`Error al eliminar empleado: ${error.message}`);
        }
    }

}