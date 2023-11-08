import { sendGreetings } from "./birthdayService";
import { FileEmployeeRepository } from "./fileEmployeeRepository";

console.log("Sending greetings...")

const employeeRepository = new FileEmployeeRepository()

sendGreetings(employeeRepository, new Date(), "localhost", 25);
