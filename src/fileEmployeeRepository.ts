import path from "path";
import fs from 'fs'
import { EmployeeRepository } from "./birthdayService";
import { Employee } from "./employee";

export class FileEmployeeRepository implements EmployeeRepository {
    getByBirthDate(date: Date): Employee[] {
        const data = fs.readFileSync(path.resolve(__dirname, `../resources/people.csv`), 'utf8')
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
