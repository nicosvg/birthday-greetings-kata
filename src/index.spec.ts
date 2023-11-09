import { NodemailerMailSender } from "./adapters/nodemailerMailSender"
import { sendGreetings } from "./domain/birthdayService"
import { Employee } from "./domain/employee"
import { EmployeeRepository } from "./ports/EmployeeRepository"
import { MailSender } from "./ports/MailSender"

class TestEmployeeRepository implements EmployeeRepository {
    employees: Employee[]
    constructor(employees: Employee[]) {
        this.employees = employees
    }
    getByBirthDate(birthDate: Date): Employee[] {
        return this.employees.filter(e => e.isBirthday(birthDate))
    }

}

describe('with mocks', () => {
    const sendMailMock = jest.spyOn(NodemailerMailSender.prototype, 'sendMail')

    it('should send greetings', () => {
        // Arrange
        const employeeRepository = new TestEmployeeRepository([new Employee('Alice', 'Foo', new Date(1999, 11, 30), 'alice@example.com')])
        const mailSender = new NodemailerMailSender('localhost', 25)
        // Act
        sendGreetings(new Date(2023, 11, 30), employeeRepository, mailSender)
        // Assert 
        expect(sendMailMock).toHaveBeenCalledTimes(1)
    })
})

interface Message {
    from: string, to: string, subject: string, body: string
}
class TestMailSender implements MailSender {
    messages: Message[] = []

    sendMail(from: string, to: string, subject: string, body: string): void {
        this.messages.push({ from, to, subject, body })
    }

    getMessages(): Message[] {
        return this.messages
    }
}

describe('with test classes', () => {
    it('should send greetings', () => {
        // Arrange
        const employee = new Employee('Alice', 'Foo', new Date(1999, 11, 30), 'alice@example.com')
        const employeeRepository = new TestEmployeeRepository([employee])
        const mailSender = new TestMailSender()
        // Act
        sendGreetings(new Date(2023, 11, 30), employeeRepository, mailSender)
        // Assert 
        expect(mailSender.getMessages()).toHaveLength(1)
        expect(mailSender.getMessages()[0].to).toBe('alice@example.com')
    })
})
