# Birthday greetings kata - Node version

This is a Typescript version of the Birthday greetings kata proposed by Matteo Vaccari here: http://matteo.vaccari.name/blog/archives/154.html

## Goals

The goal of this exercise is to refactor the code to make it
- Testable: we can write unit tests (see definition next slide)
- Flexible:
  - It is easy to change the data source (to a relational DB or microservice for instance) 
  - Email provider should be easy to change.
- Well-designed: separate clearly the business logic from the infrastructure.

## Unit tests

The tests should not read files, or send emails

## Next feature (optional) 

If you want to develop further the domain logic, you can take into account the special rule for people born on a 29th of February: they should be sent greetings on the 28th of February, except in leap years, when they will get their greetings on the 29th.
