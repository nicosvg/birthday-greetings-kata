import fs from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'
import { Employee } from './employee'

export const sendGreetings = (fileName: string, date: Date, smtpHost: string, smtpPort: number) => {
    const data = fs.readFileSync(path.resolve(__dirname, `../resources/${fileName}`), 'utf8')

    // split the contents by new line
    const lines = data.split(/\r?\n/)
    // Remove first line
    lines.shift()

    lines.forEach((line) => {
        const employeeData = line.split(', ')
        const employee = new Employee(employeeData[1], employeeData[0], new Date(employeeData[2]), employeeData[3])

        if (employee.isBirthday(date)) {
            const recipient = employee.email
            const body = 'Happy Birthday, dear %NAME%!'.replace('%NAME%',
                employee.firstName)
            const subject = 'Happy Birthday!'
            sendMessage(smtpHost, smtpPort, 'sender@here.com', subject, body, recipient)
        }
    })
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
