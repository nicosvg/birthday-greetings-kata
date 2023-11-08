import fs from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'
import { Employee } from './employee'

export interface EmployeeRepository {
    getByBirthDate(birthDate: Date): Employee[]
}

export const sendGreetings = (employeeRepository: EmployeeRepository, date: Date, smtpHost: string, smtpPort: number) => {
    const employees = employeeRepository.getByBirthDate(date)

    for (const employee of employees) {
        if (employee.isBirthday(date)) {
            const recipient = employee.email
            const body = 'Happy Birthday, dear %NAME%!'.replace('%NAME%',
                employee.firstName)
            const subject = 'Happy Birthday!'
            sendMessage(smtpHost, smtpPort, 'sender@here.com', subject, body, recipient)
        }
    }
}

const sendMessage = async (smtpHost: string, smtpPort: number, sender: string,
    subject: string, body: string, recipient: string) => {

    const message = {
        host: smtpHost,
        port: smtpPort,
        from: sender,
        to: [recipient],
        subject,
        text: body
    }

    const transport = nodemailer.createTransport({ host: smtpHost, port: smtpPort })
    await transport.sendMail(message)
}
