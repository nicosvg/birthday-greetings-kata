import { sendGreetings } from "./birthdayService"

it('should send greetings', () => {
    // Act
    sendGreetings("people.csv", new Date(), "localhost", 25)
    // Assert 
    // TODO
})
