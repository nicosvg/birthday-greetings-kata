import fs from 'fs';
import path from "path";
import { Employee } from "../domain/employee";
import { EmployeeRepository } from '../ports/EmployeeRepository';

export class FileEmployeeRepository implements EmployeeRepository {
    filename: string;
    constructor(filename: string) {
        this.filename = filename
    }

    getByBirthDate(date: Date): Employee[] {
        const data = fs.readFileSync(path.resolve(__dirname, this.filename), 'utf8')
        // split the contents by new line
        const lines = data.split(/\r?\n/)
        // Remove first line
        lines.shift()

        return lines.map((line: string) => {
            const employeeData = line.split(', ')
            return new Employee(employeeData[1], employeeData[0], new Date(employeeData[2]), employeeData[3])
        }).filter((employee: Employee) => employee.isBirthday(date))
    }
}
