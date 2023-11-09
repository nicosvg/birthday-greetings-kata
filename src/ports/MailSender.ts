
export interface MailSender {
    sendMail(from: string, to: string, subject: string, body: string): void;
}
