import { Router } from 'express';
import { getEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee } from '../controllers/employeeController';

const employeeRoutes: Router = Router();

employeeRoutes.get('/', getEmployees);
employeeRoutes.get('/:employee_id', getEmployeeById);
employeeRoutes.post('/', createEmployee);
employeeRoutes.put('/:employee_id', updateEmployee);
employeeRoutes.delete('/:employee_id', deleteEmployee);

export default employeeRoutes;