import { FileEmployeeRepository } from "./adapters/fileEmployeeRepository";
import { NodemailerMailSender } from "./adapters/nodemailerMailSender";
import { sendGreetings } from "./domain/birthdayService";

console.log("Sending greetings...")

const employeeRepository = new FileEmployeeRepository(`../resources/people.csv`)
const mailSender = new NodemailerMailSender('localhost', 25)

sendGreetings(new Date(), employeeRepository, mailSender);
