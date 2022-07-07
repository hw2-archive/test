# Lepaya Recruitment Test Backend

## Description

This project uses the [NestJS](https://nestjs.com/) framework and it takes advantage of both **Object Oriented programming** with SOLID principles,
and the [**Reactive functional programming**](https://en.wikipedia.org/wiki/Functional_reactive_programming) with [RxJS](https://rxjs.dev/) and [Rambda](https://ramdajs.com/) to implement
the [Recruitment test](https://github.com/Lepaya/recruitement-tests/blob/main/backend.md) for the Lepaya backend team.

![swagger](screenshot.jpg 'Swagger')

### Directory structure:

- src
- - app - contains the main application module
- - lepaya - contains the aggregates of the course domain
- - libs - contains reusable and agnostic pure functions
- main.ts - app bootstrap file

### Features:

- Swagger Open Api integration on http://localhost:3000/api-docs/ with fully typed definitions
- Dynamic configuration module with validation and type inferring
- Audit logs with nestjs/event-emitter based on the Observer Pattern
- API nested field resolution using functional composition
- NestJS, RxJS, and Rambda integration
- Unit and e2e tests with jest
- Global error handling with exception filters
- Node engines version check

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## What to improve

- A bit more logic to check the Algorithm complexity
- Improve design patterns
- Unit test coverage
