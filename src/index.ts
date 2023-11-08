import { sendGreetings } from "./birthdayService";

console.log("Sending greetings...")

sendGreetings("people.csv", new Date(), "localhost", 25);
