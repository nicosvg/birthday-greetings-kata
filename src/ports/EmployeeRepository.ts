import { Employee } from '../domain/employee';


export interface EmployeeRepository {
    getByBirthDate(birthDate: Date): Employee[];
}
