import { EmployeeRepository } from '../ports/EmployeeRepository'
import { MailSender } from '../ports/MailSender'

export const sendGreetings = (date: Date, employeeRepository: EmployeeRepository, mailSender: MailSender) => {
    const employees = employeeRepository.getByBirthDate(date)

    for (const employee of employees) {
        if (employee.isBirthday(date)) {
            const body = 'Happy Birthday, dear %NAME%!'.replace('%NAME%',
                employee.firstName)
            const subject = 'Happy Birthday!'
            mailSender.sendMail('sender@here.com', employee.email, subject, body)
        }
    }
}
