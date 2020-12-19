# FrontEnd Project

This is the client-side of our Web Engineering 2 Project.

It is an Angular 11 application interacting with the server-side through JSON web services.

For a general description of the project please refer to the ReadMe.md included in the submission directory directly.
This file only covers parts specific to the FrontEnd project

## Script overview

| Command       | Description               |
|---------------|---------------------------|
| npm install   | Install required packages |
| npm run start | Start development server  |
| npm run tests | Run unit tests            |
| npm run lint  | Run linting               |
| npm run e2e   | Run E2E test              |
| npm run docs  | Build documentation       |

## Installation

To install the required packages go to the 'FrontEnd' directory, open the terminal/console/bash, and type
in `npm install`.

To later run the E2E test also run 'webdriver-manager update' to download the binaries. (TODO check if this is needed)

## Development environment

The development environment includes the Angular development server, where the app will automatically reload if you
change any of the source files. Additionally, it includes the documentation.

### Development server

To start the development server, use the `Angular CLI Server` Webstorm Configuration or simply use `npm run start`. This
starts the Angular Development Server on http://localhost:4200/ with the proxy configuration to reroute API calls to the
server running on port 3000. For more than static component development make sure the server (BackEnd project) is
running on port 3000.

### Documentation

To access the documentation about the client-side application, run the `Angular Docs` Webstorm configuration
or `npm run docs`. Both will start the documentation build using [compodoc](https://compodoc.app/) based on ts-doc
comments in the source code. The documentation can be found in the `./documentation` directory and is automatically
served on http://127.0.0.1:8080. Please make sure port 8080 is not in use and does not require elevated privileges.

## Production deployment (of the entire app)

After development, the Angular app is supposed to be hosted on the express back-end server and not the Angular
development server.
**For this process, a gulpfile is provided in the BackEnd project**.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

The unit tests check if all components, services, and directives are created and if the app components loads.

## Running end-to-end tests

(TODO CHECK THIS) Before running the E2E test run 'webdriver-manager update' to download binaries.

> Make sure the back-end server is running on localhost:3000!

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

The E2E test emulates a user lifecycle. This means Protractor:

1. Navigates to the register page
2. Registers a new test user

- Test user configuration specified in `app.po.ts`
  - Default username `test517357643167`

3. Navigates to the login page
4. Logs in as the test user
5. Navigates to delete user page
6. Deletes the test user, so no artifacts remain

All this is done using Chromium webdriver and then a second time using the Firefox webdriver.
