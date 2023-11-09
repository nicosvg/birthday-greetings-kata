
import nodemailer from 'nodemailer'
import { MailSender } from '../ports/MailSender'

export class NodemailerMailSender implements MailSender {
    transport: nodemailer.Transporter

    constructor(smtpHost: string, smtpPort: number) {
        this.transport = nodemailer.createTransport({ host: smtpHost, port: smtpPort })
    }

    async sendMail(from: string, to: string, subject: string, body: string): Promise<void> {
        const message = {
            from: from,
            to: [to],
            subject,
            text: body
        }

        await this.transport.sendMail(message)
    }
}
